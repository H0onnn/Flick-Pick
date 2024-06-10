"use server";

import { cache } from "react";
import { MovieDetail, MovieList } from "@/app/features/movie/models";
import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidatePath } from "next/cache";

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const YOUTUBE_API_URL = process.env.YOUTUBE_API_URL;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// 현재 상영작
export const getMoviesByNowPlaying = cache(async (): Promise<MovieList> => {
  const response = await fetch(
    `${TMDB_API_URL}now_playing?language=ko-KR&region=KR&sort_by=vote_average.desc&adult=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error("현재 상영작 목록을 불러오는데 실패했습니다.");
  }

  return await response.json();
});

// TMDB 인기순
export const getMoviesByTopRated = cache(async (): Promise<MovieList> => {
  const response = await fetch(
    `${TMDB_API_URL}top_rated?language=ko-KR&region=KR&sort_by=vote_average.desc&adult=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error("TMDB 순위 목록을 불러오는데 실패했습니다.");
  }

  return await response.json();
});

// 상영 예정작
export const getMoviesByUpcoming = cache(async (): Promise<MovieList> => {
  const response = await fetch(
    `${TMDB_API_URL}upcoming?language=ko-KR&region=KR&sort_by=vote_average.desc&include_adult=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error("상영 예정작 목록을 불러오는데 실패했습니다.");
  }

  return await response.json();
});

// 영화 좋아요 여부 확인
export const isLikedMovie = cache(
  async (userId: string, movieId: string): Promise<boolean> => {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        movieId,
      },
    });

    return !!existingLike;
  },
);

// 영화 상세 정보
export const getMovieDetail = cache(
  async (id: string): Promise<MovieDetail> => {
    const session = await getServerSession();
    const userId = session?.user?.id;

    const response = await fetch(
      `${TMDB_API_URL}${id}?append_to_response=credits&language=ko-KR`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error(response.statusText);
      throw new Error("영화 상세 정보를 불러오는데 실패했습니다.");
    }

    const movieDetail: MovieDetail = await response.json();

    let isLiked = false;
    if (userId) {
      const existingLike = await isLikedMovie(userId, id);

      isLiked = !!existingLike;
    }

    return { ...movieDetail, isLiked };
  },
);

// 장르 id로 연관 검색
export const getMoviesByGenre = cache(
  async (genreIds: number[], page?: number): Promise<MovieList> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=ko-KR&page=${page}&sort_by=popularity.desc&with_genres=${genreIds.join(",")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error(response.statusText);
      throw new Error("장르별 영화 목록을 불러오는데 실패했습니다.");
    }

    return await response.json();
  },
);

// 유튜브 영화 예고편 검색
export const getMovieTrailer = cache(async (query: string) => {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&q=${query} 예고편&type=video&key=${YOUTUBE_API_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    return response.json();
  } catch (error) {
    return {
      error: error,
    };
  }
});

// 영화 정보 저장
export const saveMovie = async (movieDetail: MovieDetail): Promise<void> => {
  // 중복 저장 방지
  const existingMovie = await prisma.movie.findFirst({
    where: {
      id: String(movieDetail.id),
    },
  });

  if (existingMovie) return;

  await prisma.movie.create({
    data: {
      id: String(movieDetail.id),
      title: movieDetail.title,
      overview: movieDetail.overview,
      poster: movieDetail.poster_path,
      releaseDate: movieDetail.release_date,
      createdAt: new Date(),
    },
  });
};

// 영화 좋아요 및 좋아요 취소
export const toggleLikeMovie = async (formData: FormData): Promise<void> => {
  const session = await getServerSession();

  if (!session) return;

  const userId = session.user?.id as string;
  const movieId = formData.get("movieId") as string;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId,
      movieId,
    },
  });

  if (existingLike) {
    // 좋아요 취소
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    revalidatePath(`/movie/${movieId}`);
  } else {
    // 좋아요 추가
    await prisma.like.create({
      data: {
        userId,
        movieId,
      },
    });

    revalidatePath(`/movie/${movieId}`);
  }
};
