import { useQuery } from "@tanstack/react-query";
import { MovieList } from "@/app/shared/types";

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const fetchMoviesByNowPlaying = async () => {
  try {
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

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const useGetMoviesByNowPlaying = () => {
  const { data, isFetching } = useQuery<MovieList>({
    queryKey: ["movies", "now_playing"],
    queryFn: fetchMoviesByNowPlaying,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  return { movieListByNowPlaying: data, isFetching };
};
