import { cache } from "react";
import { fetchTMDB } from "@/app/shared/apis";
import { MovieList } from "@/app/features/movie/models";

export const getMoviesByNowPlaying = cache(async (): Promise<MovieList> => {
  return await fetchTMDB.get(
    `movie/now_playing?language=ko-KR&region=KR&sort_by=vote_average.desc&adult=false`,
  );
});
