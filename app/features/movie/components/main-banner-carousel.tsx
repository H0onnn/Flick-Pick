"use client";

import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "@/app/shared/constants";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/shared/components";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import { MovieList } from "@/app/features/movie/models";

export const MainBannerCarousel = ({ movieList }: { movieList: MovieList }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 6000,
        }),
        Fade(),
      ]}
      opts={{
        align: "start",
        loop: true,
        watchDrag: true,
      }}
    >
      <CarouselContent>
        {movieList.results.map((movie) => (
          <CarouselItem key={movie.id}>
            <Link href={`movie/${movie.id}`}>
              <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[550px] bg-cover bg-center">
                <Image
                  src={`${IMAGE_BASE_URL.DEFAULT}${IMAGE_SIZE.BACKDROP.W1280}${movie.backdrop_path}`}
                  fill={true}
                  className="object-cover"
                  alt="배너 이미지"
                  placeholder="blur"
                  blurDataURL={IMAGE_BASE_URL.BLUR}
                />
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
