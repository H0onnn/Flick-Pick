import { useInfiniteQuery } from "@tanstack/react-query";
import { MovieList } from "@/app/shared/types";

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const fetchMoviesByQuery = async ({
  value,
  page,
}: {
  value: string;
  page: number;
}) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=ko-KR&page=${page}&append_to_response=credits`,
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

export const useGetMoviesByQuery = ({ value }: { value: string }) => {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<MovieList>({
      queryKey: ["movies", value],
      queryFn: ({ pageParam = 1 }) =>
        fetchMoviesByQuery({ value, page: pageParam as number }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.total_pages < lastPage.page) {
          return undefined;
        }

        return allPages.length + 1;
      },
      staleTime: Infinity,
      enabled: !!value,
    });

  const handleFetchNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return {
    movies: data?.pages.flatMap((page) => page.results),
    handleFetchNextPage,
    isFetching,
  };
};
