"use server";

import { cache } from "react";

import { fetchTMDB } from "@/app/shared/apis";
import { MovieList } from "../../movie/models";

export const getMoviesByQuery = cache(
  async ({
    query,
    page = 1,
  }: {
    query: string;
    page?: number;
  }): Promise<MovieList> => {
    return await fetchTMDB.get(
      `search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}&append_to_response=credits`,
    );
  },
);
