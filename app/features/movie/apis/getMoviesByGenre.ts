import { cache } from "react";
import { fetchTMDB } from "@/app/shared/apis";
import { MovieList } from "../models";

export const getMoviesByGenre = cache(
  async (genreIds: number[]): Promise<MovieList> => {
    return await fetchTMDB.get(
      `discover/movie?include_adult=false&language=ko-KR&sort_by=popularity.desc&with_genres=${genreIds.join(",")}`,
    );
  },
);
