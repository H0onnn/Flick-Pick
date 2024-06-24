import { useState, useEffect, useTransition } from "react";
import { Movie } from "../../movie/models";
import { getMoviesByQuery } from "../apis";

export const useSearchMovie = ({ searchQuery }: { searchQuery: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      const { results } = await getMoviesByQuery({
        query: searchQuery,
      });

      startTransition(() => {
        setMovies(results);
      });

      setIsLoading(false);
    };

    fetchMovies();
  }, [searchQuery]);

  return {
    isPending,
    isLoading,
    movies,
  };
};
