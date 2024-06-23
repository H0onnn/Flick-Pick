import Image from "next/image";
import Link from "next/link";

import ICONS from "@/app/public/icons";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Flex,
} from "@/app/shared/components";

import { User } from "../../auth/models";

interface MyReviewCardProps {
  user: User;
  rating: number;
  review: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  createdAt: Date;
}

export const MyReviewCard = ({
  user,
  rating,
  review,
  movieId,
  movieTitle,
  moviePoster,
  createdAt,
}: MyReviewCardProps) => {
  return (
    <Flex direction="column" className="space-y-3">
      <Link href={`/movie/${movieId}`} prefetch>
        <Flex justify="between">
          <Flex className="space-x-2">
            <Avatar className="border border-border border-solid w-12 h-12">
              <AvatarImage src={user.image as string} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>

            <Flex direction="column" className="space-y-2 py-2">
              <p className="head6sb line-clamp-1">{movieTitle}</p>
              <p className="body2 my-3 line-clamp-3">{review}</p>
              <Flex align="center" className="space-x-1">
                <Image src={ICONS.FULL_STAR} className="w-6 h-6" alt="별점" />
                <p className="label3 text-yellow-500 mt-0.5">{rating}</p>
              </Flex>

              <p className="text-xs font-semibold text-gray-500 pt-2">
                {createdAt.toLocaleDateString()}
              </p>
            </Flex>
          </Flex>

          <Image
            src={`https://image.tmdb.org/t/p/w200/${moviePoster}`}
            alt="포스터"
            width={100}
            height={130}
            className="object-contain ml-3"
          />
        </Flex>
      </Link>
    </Flex>
  );
};
