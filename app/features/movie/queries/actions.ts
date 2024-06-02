"use server";

import { MovieList } from "@/app/shared/types";

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const getMoviesByNowPlaying = async (): Promise<MovieList> => {
  const response = await fetch(
    `${TMDB_API_URL}now_playing?language=ko-KR&region=KR&sort_by=vote_average.desc&video=true&adult=false`,
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

  return response.json();
};

export const getMoviesByTopRated = async (): Promise<MovieList> => {
  const response = await fetch(
    `${TMDB_API_URL}top_rated?language=ko-KR&region=KR&sort_by=vote_average.desc&video=true&adult=false`,
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

  return response.json();
};

export const getMoviesByUpcoming = async (): Promise<MovieList> => {
  const response = await fetch(
    `${TMDB_API_URL}upcoming?language=ko-KR&region=KR&sort_by=vote_average.desc&video=true&include_adult=false`,
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

  return response.json();
};
