import Image from "next/image";
import {
  Card,
  Flex,
  StarRating,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Separator,
} from "@/app/shared/components";
interface MainReviewCardProps {
  movieTitle: string;
  moviePoster: string;
  review: string;
  userName: string;
  userProfile: string;
  rating: number;
}

export const MainReviewCard = ({
  movieTitle,
  moviePoster,
  review,
  userName,
  userProfile,
  rating,
}: MainReviewCardProps) => {
  return (
    <Card className="flex flex-col w-full h-full shadow-0 p-3 border border-border border-solid rounded-lg">
      <Flex align="center" justify="between">
        <Flex align="center" className="gap-2">
          <Avatar className="border border-border border-solid w-7 h-7">
            <AvatarImage src={userProfile} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>

          <p className="label3">{userName}</p>
        </Flex>

        <StarRating rating={rating} size={14} />
      </Flex>

      <Flex className="gap-2 my-3 h-full">
        <Image
          src={moviePoster}
          alt="포스터"
          className="object-contain"
          width={80}
          height={100}
        />

        <Flex direction="column" className="gap-2 p-2 w-full">
          <p className="label2 text-gray-500 line-clamp-1">{movieTitle}</p>
          <p className="body3 line-clamp-4">{review}</p>
        </Flex>
      </Flex>

      <Separator />

      <Flex align="center" className="mt-3 label3">
        <p>좋아용</p>
      </Flex>
    </Card>
  );
};
