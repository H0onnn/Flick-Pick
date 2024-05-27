"use client";

import Link from "next/link";

import { useGetMoviesByNowPlaying } from "../queries";
import { MovieCard } from "./movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/shared/components";

import Autoplay from "embla-carousel-autoplay";

export const NowPlayingCarousel = () => {
  const { movieListByNowPlaying, isFetching } = useGetMoviesByNowPlaying();

  if (!movieListByNowPlaying || isFetching) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
        watchDrag: true,
      }}
    >
      <CarouselPrevious className="-left-4 top-[40%] z-10 hidden sm:flex" />
      <CarouselContent className="pb-16">
        {movieListByNowPlaying.results
          .sort((a, b) => b.vote_average - a.vote_average)
          .sort(
            (a, b) =>
              Number(b.release_date.split("-")[0]) -
              Number(a.release_date.split("-")[0]),
          )
          .map((movie, idx) => (
            <CarouselItem
              key={movie.id}
              className="
              basis-[calc(100%/3)] sm:basis-[calc(100%/3)] md:basis-[calc(100%/4)] lg:basis-[calc(100%/5)] 
              h-[calc((100vw-16px)/3*1.5)] sm:h-[calc((100vw-16px)/3*1.5)] md:h-[calc((100vw-16px)/4*1.5)] lg:h-[calc((100vw-16px)/5*1.3)]
              "
            >
              <Link href={`movie/${movie.id}`}>
                <MovieCard
                  poster_path={movie.poster_path}
                  rank={idx + 1}
                  title={movie.title}
                  release_date={movie.release_date.split("-")[0]}
                  vote_average={Number(movie.vote_average.toFixed(1))}
                />
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselNext className="-right-4 top-[40%] hidden sm:flex" />
    </Carousel>
  );
};
