import { Flex, NonDataFallback } from "@/app/shared/components";
import { GetReviewProps } from "../queries";
import { DetailReviewCard } from "./detail-review-card";
import { MessageCircleOff } from "lucide-react";

interface DetailReviewListProps {
  reviews: GetReviewProps[];
}

export const DetailReviewList = ({ reviews }: DetailReviewListProps) => {
  if (reviews.length === 0)
    return (
      <NonDataFallback
        icon={<MessageCircleOff size={72} className="text-gray-500" />}
        fallbackText={
          <>
            아직 작성된 리뷰가 없어요,
            <br />첫 번째 리뷰를 작성해보세요!
          </>
        }
      />
    );

  return (
    <Flex direction="column" className="gap-4">
      {reviews.map((review) => (
        <DetailReviewCard
          key={review.id}
          id={review.id}
          movieId={review.movieId}
          review={review.comment}
          userName={review.user.name!}
          userProfile={review.user.image!}
          rating={review.rating}
          createdAt={review.createdAt}
          updatedAt={review.updatedAt || undefined}
          isLiked={review.isLiked}
        />
      ))}
    </Flex>
  );
};
