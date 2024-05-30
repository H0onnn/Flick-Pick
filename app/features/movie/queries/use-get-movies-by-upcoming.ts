import { useQuery } from "@tanstack/react-query";
import { MovieList } from "@/app/shared/types";

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const fetchMoviesByUpComing = async () => {
  try {
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

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const useGetMoviesByUpComing = () => {
  const { data, isFetching } = useQuery<MovieList>({
    queryKey: ["movies", "upcoming"],
    queryFn: fetchMoviesByUpComing,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { movieListByUpComing: data, isFetching };
};
