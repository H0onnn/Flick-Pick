import {
  Card,
  Flex,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Separator,
} from "@/app/shared/components";
import { StarRating } from "@/app/features/review/components";
import { LikeButton } from "@/app/features/like/components";

interface DetailReviewCardProps {
  id: string;
  movieId: string;
  userName: string;
  userProfile: string;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt?: Date;
  isLiked: boolean;
}

export const DetailReviewCard = ({
  id,
  movieId,
  userName,
  userProfile,
  rating,
  review,
  createdAt,
  updatedAt,
  isLiked,
}: DetailReviewCardProps) => {
  return (
    <Card className="flex flex-col w-full h-full shadow-none p-3 border border-border border-solid rounded-lg">
      <Flex align="center" justify="between">
        <Flex direction="column" className="gap-2">
          <Flex align="center" className="gap-2">
            <StarRating rating={rating} size={18} />
            <span className="head6sb">{rating.toFixed(1)}</span>
          </Flex>

          <p className="body3 text-gray-500">
            {updatedAt
              ? `${new Date(updatedAt).toLocaleDateString()} (수정됨)`
              : `${new Date(createdAt).toLocaleDateString()}`}
          </p>
        </Flex>

        <Flex align="center" className="gap-2">
          <p className="label3">{userName}</p>

          <Avatar className="border border-border border-solid w-7 h-7">
            <AvatarImage src={userProfile} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
        </Flex>
      </Flex>

      <p className="body2 my-3 line-clamp-4">{review}</p>

      <Separator />

      <LikeButton
        id={id}
        type="review"
        isLiked={isLiked}
        size={14}
        className="mt-3"
      />
    </Card>
  );
};
