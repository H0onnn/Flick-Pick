import { Frown } from "lucide-react";
import { Flex, Separator, NonDataFallback } from "@/app/shared/components";

import { getMyReviewsToMyPage } from "../../review/apis";

import { MyReviewCard } from "./my-review-card";

export const MyReviews = async () => {
  const reviews = await getMyReviewsToMyPage();

  if (!reviews)
    return (
      <Flex align="center" justify="center" className="pt-8 h-screen">
        <NonDataFallback
          icon={<Frown size={72} className="text-gray-500" />}
          fallbackText="작성한 리뷰가 아직 없어요."
        />
      </Flex>
    );

  return (
    <Flex direction="column" className="gap-6 pt-8">
      {reviews.map((review, idx) => (
        <>
          <MyReviewCard
            key={review.id}
            user={review.user}
            movieId={review.movie.id}
            moviePoster={review.movie.poster}
            movieTitle={review.movie.title}
            rating={review.rating}
            review={review.comment}
            createdAt={review.createdAt}
          />

          {idx !== reviews.length - 1 && <Separator />}
        </>
      ))}
    </Flex>
  );
};
