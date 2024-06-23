import { cn } from "@/app/shared/utils";
import { Frown } from "lucide-react";
import { Flex, NonDataFallback } from "@/app/shared/components";
import { MyWishMovieCard } from "./my-wish-movie-card";
import { getMyWishMovies } from "../apis";

export const WishMovieList = async () => {
  const wishMovies = await getMyWishMovies();

  if (!wishMovies) {
    return (
      <Flex align="center" justify="center" className="pt-8 h-screen">
        <NonDataFallback
          icon={<Frown size={72} className="text-gray-500" />}
          fallbackText="찜한 작품이 아직 없어요."
        />
      </Flex>
    );
  }

  return (
    <Flex className="pt-8 flex-wrap">
      {wishMovies.map((wishMovie, idx) => (
        <div
          key={wishMovie.id}
          className={cn(
            "mt-4 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
            {
              "mt-0": idx < 2,
              "sm:mt-0": idx < 4,
              "md:mt-0": idx < 5,
              "lg:mt-0": idx < 6,
            },
          )}
        >
          <MyWishMovieCard
            movieId={wishMovie.movie.id}
            poster={wishMovie.movie.poster}
            title={wishMovie.movie.title}
            releaseDate={wishMovie.movie.releaseDate}
          />
        </div>
      ))}
    </Flex>
  );
};
