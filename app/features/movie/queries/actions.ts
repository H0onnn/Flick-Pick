"use server";

import { MovieDetail, MovieList } from "@/app/features/movie/models";

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

// 현재 상영작
export const getMoviesByNowPlaying = async (): Promise<MovieList> => {
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
};

// TMDB 인기순
export const getMoviesByTopRated = async (): Promise<MovieList> => {
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
};

// 상영 예정작
export const getMoviesByUpcoming = async (): Promise<MovieList> => {
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
};

// 영화 상세 정보
export const getMovieDetail = async (id: string): Promise<MovieDetail> => {
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

  return await response.json();
};

// 장르 id로 연관 검색
export const getMoviesByGenre = async (
  genreIds: number[],
  page?: number,
): Promise<MovieList> => {
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
};
