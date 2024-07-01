import { cache } from "react";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";

import { Review } from "../models";
import { User } from "../../auth/models";

export interface GetReviewProps extends Review {
  user: User;
  isLiked: boolean;
}

const isLikedReview = cache(
  async (userId: string, reviewId: string): Promise<boolean> => {
    const existingLike = await prisma.reviewLike.findFirst({
      where: {
        userId,
        reviewId,
      },
    });

    return !!existingLike;
  },
);

// 영화 리뷰 3개 조회 (상세 페이지)
export const getReviewsByMovieLimit = async (
  movieId: string,
): Promise<GetReviewProps[]> => {
  const session = await getServerSession();

  const userId = session?.user?.id ?? "";

  const reviews = await prisma.review.findMany({
    take: 3,
    where: {
      movieId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return await Promise.all(
    reviews.map(async (review) => {
      const isLiked = await isLikedReview(userId, review.id);

      return {
        ...review,
        isLiked,
      };
    }),
  );
};
