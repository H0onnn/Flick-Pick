import { cache } from "react";

import prisma from "@/app/shared/lib/prisma";

import { Review } from "../models";
import { User } from "../../auth/login/models";

export interface GetAllReviews extends Review {
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

// 영화 리뷰 조회 (전체 리스트)
export const getReviewsByMovie = cache(
  async (movieId: string): Promise<GetAllReviews[]> => {
    const reviews = await prisma.review.findMany({
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
        const isLiked = await isLikedReview(review.userId, review.id);

        return {
          ...review,
          isLiked,
        };
      }),
    );
  },
);
