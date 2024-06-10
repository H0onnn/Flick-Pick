import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/shared/components";
import { MainReviewCard } from "./main-review-card";
import { getRecentReviews } from "@/app/features/review/queries";

export const MainReviewCarousel = async () => {
  const reviews = await getRecentReviews();

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
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="sm:basis-1/2 lg:basis-1/3">
            <Link href={`/movie/${review.movieId}`}>
              <MainReviewCard
                movieTitle={review.movie.title}
                moviePoster={`https://image.tmdb.org/t/p/w500/${review.movie.poster}`}
                review={review.comment}
                userName={review.user.name!}
                userProfile={review.user.image!}
                rating={review.rating}
                likes={review.likes.length}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="-right-4 hidden sm:flex" />
    </Carousel>
  );
};
