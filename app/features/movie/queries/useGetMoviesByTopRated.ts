import { useQuery } from "@tanstack/react-query";
import { MovieList } from "@/app/shared/types";

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const fetchMoviesByTopRated = async () => {
  try {
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

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const useGetMoviesByTopRated = () => {
  const { data, isFetching } = useQuery<MovieList>({
    queryKey: ["movies", "top_rated"],
    queryFn: fetchMoviesByTopRated,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  return { movieListByTopRated: data, isFetching };
};
