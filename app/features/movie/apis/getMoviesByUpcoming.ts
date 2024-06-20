import { cache } from "react";
import { fetchTMDB } from "@/app/shared/apis";
import { MovieList } from "../models";

export const getMoviesByUpcoming = cache(async (): Promise<MovieList> => {
  return await fetchTMDB.get(
    `movie/upcoming?language=ko-KR&region=KR&sort_by=vote_average.desc&include_adult=false`,
  );
});
