import { cache } from "react";
import { fetchTMDB } from "@/app/shared/apis";
import { MovieList } from "../models";

export const getMoviesByTopRated = cache(async (): Promise<MovieList> => {
  return await fetchTMDB.get(
    `movie/top_rated?language=ko-KR&region=KR&sort_by=vote_average.desc&adult=false`,
  );
});
