import { useQuery } from "@tanstack/react-query";
import { MovieDetail } from "@/app/shared/types";

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const fetchMovie = async (id: string) => {
  try {
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

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const useMovieDetail = ({ id }: { id: string }) => {
  const { data } = useQuery<MovieDetail>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
    staleTime: Infinity,
    enabled: !!id,
  });

  return {
    movieInfo: data,
  };
};
