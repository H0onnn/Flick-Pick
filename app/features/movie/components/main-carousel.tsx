"use client";

import Link from "next/link";
import { MovieCard } from "./movie-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/shared/components";

import Autoplay from "embla-carousel-autoplay";
import { MovieList } from "@/app/features/movie/models";

interface MainCarouselProps {
  type?: "default" | "upcoming" | "related";
  movieList: MovieList["results"];
}

export const MainCarousel = ({
  type = "default",
  movieList,
}: MainCarouselProps) => {
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
      <CarouselContent>
        {movieList.map((movie, idx) => (
          <CarouselItem
            key={movie.id}
            className="
                  basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5
                  aspect-[2/3] sm:aspect-[2/3] md:aspect-[2/3] lg:aspect-[2/3]
                  "
          >
            <Link href={`/movie/${movie.id}`}>
              <MovieCard
                type={type}
                poster_path={movie.poster_path}
                rank={type === "default" ? idx + 1 : undefined}
                title={movie.title}
                release_date={
                  type === "default"
                    ? movie.release_date.split("-")[0]
                    : movie.release_date
                }
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
