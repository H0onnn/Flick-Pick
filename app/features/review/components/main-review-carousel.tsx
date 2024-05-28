"use client";

import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/shared/components";
import { MainReviewCard } from "./main-review-card";

const REVIEWS = [
  {
    id: 1,
    reviewId: 1,
    movieId: 1,
    movieTitle: "Movie Title",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    review: "Review",
    userName: "User Name",
    userProfile:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    rating: 5,
  },
  {
    id: 2,
    reviewId: 2,
    movieId: 2,
    movieTitle: "Movie Title",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    review: "Review",
    userName: "User Name",
    userProfile:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    rating: 5,
  },
  {
    id: 3,
    reviewId: 3,
    movieId: 3,
    movieTitle: "Movie Title",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    review: "Review",
    userName: "User Name",
    userProfile:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    rating: 5,
  },
  {
    id: 4,
    reviewId: 4,
    movieId: 4,
    movieTitle: "Movie Title",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    review: "Review",
    userName: "User Name",
    userProfile:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    rating: 5,
  },
  {
    id: 5,
    reviewId: 5,
    movieId: 5,
    movieTitle: "Movie Title",
    moviePoster:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    review: "Review",
    userName: "User Name",
    userProfile:
      "https://image.tmdb.org/t/p/w500/6Yb2Y5xjNzGqyv0l4ZGqZ1iEYb5.jpg",
    rating: 5,
  },
] as const;

export const MainReviewCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        watchDrag: true,
        slidesToScroll: 2,
        duration: 40,
      }}
    >
      <CarouselPrevious className="-left-4 z-10 hidden sm:flex" />
      <CarouselContent>
        {REVIEWS.map((review) => (
          <CarouselItem
            key={review.id}
            className="
            basis-[calc(100%/1)] sm:basis-[calc(100%/2)] lg:basis-[calc(100%/3)] 
            h-[calc((100vw-16px)/3*1.5)] sm:h-[calc((100vw-16px)/4*1.5)] lg:h-[calc((100vw-16px)/6*1.3)]
            "
          >
            <Link href={`movie/${review.id}`}>
              <MainReviewCard
                reviewId={review.reviewId}
                movieId={review.movieId}
                movieTitle={review.movieTitle}
                moviePoster={review.moviePoster}
                review={review.review}
                userName={review.userName}
                userProfile={review.userProfile}
                rating={review.rating}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="-right-4 hidden sm:flex" />
    </Carousel>
  );
};
