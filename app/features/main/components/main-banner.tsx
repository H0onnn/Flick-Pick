"use client";

import { useGetMoviesByTopRated } from "../queries";
import { MovieCard } from "./movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/shared/components";

export const MainBanner = () => {
  const { movieListByTopRated, isFetching } = useGetMoviesByTopRated();

  if (!movieListByTopRated || isFetching) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        watchDrag: true,
      }}
    >
      <CarouselPrevious className="-left-4 top-[40%] z-10 hidden sm:flex" />
      <CarouselContent className="pb-16">
        {movieListByTopRated.results.map((movie, idx) => (
          <CarouselItem
            key={movie.id}
            className="
              basis-[calc(100%/3)] sm:basis-[calc(100%/3)] md:basis-[calc(100%/4)] lg:basis-[calc(100%/5)] 
              h-[calc((100vw-16px)/3*1.5)] sm:h-[calc((100vw-16px)/3*1.5)] md:h-[calc((100vw-16px)/4*1.5)] lg:h-[calc((100vw-16px)/5*1.3)]
              "
          >
            <MovieCard
              poster_path={movie.poster_path}
              rank={idx + 1}
              title={movie.title}
              release_date={movie.release_date.split("-")[0]}
              vote_average={Number(movie.vote_average.toFixed(1))}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="-right-4 top-[40%] hidden sm:flex" />
    </Carousel>
  );
};
