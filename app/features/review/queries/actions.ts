"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { PostReviewDto, Review } from "@/app/features/review/models";
import { User } from "@/app/features/auth/models";

// 리뷰 작성
export const postReview = async (body: PostReviewDto): Promise<void> => {
  const session = await getServerSession();

  if (!session) return;

  await prisma.review.create({
    data: {
      ...body,
      userId: session.user?.id as string,
    },
  });

  revalidatePath(`/movie/${body.movieId}`);
};

// 리뷰 수정
export const updateReview = async (body: PostReviewDto): Promise<void> => {
  const session = await getServerSession();

  const targetReview = await prisma.review.findFirst({
    where: {
      userId: session?.user?.id,
      movieId: body.movieId,
    },
  });

  if (!targetReview) {
    throw new Error("해당 코멘트를 찾을 수 없습니다.");
  }

  await prisma.review.update({
    where: {
      id: targetReview.id,
    },
    data: {
      rating: body.rating,
      comment: body.comment,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/movie/${body.movieId}`);
};

// 리뷰 단일 삭제
export const deleteReview = async (movieId: string): Promise<void> => {
  const session = await getServerSession();

  const targetReview = await prisma.review.findFirst({
    where: {
      userId: session?.user?.id,
      movieId,
    },
  });

  if (!targetReview) {
    throw new Error("해당 코멘트를 찾을 수 없습니다.");
  }

  await prisma.review.delete({
    where: {
      id: targetReview.id,
    },
  });

  revalidatePath(`/movie/${movieId}`);
};

// 리뷰 좋아요 여부 확인
export const isLikedReview = cache(
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

interface GetRecentReviewProps extends Review {
  user: User;
  movie: {
    id: string;
    title: string;
    overview: string;
    poster: string;
    releaseDate: string;
  };
  likes: {
    id: string;
  }[];
}

// 가장 최근 작성된 리뷰 6개 조회 (메인 페이지)
export const getRecentReviews = cache(
  async (): Promise<GetRecentReviewProps[]> => {
    return await prisma.review.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        movie: true,
        likes: true,
      },
    });
  },
);

// 영화에 대한 내 리뷰 조회 (마이 페이지)
export const getMyReviewByMovie = cache(
  async (movieId: string): Promise<Review | null> => {
    const session = await getServerSession();

    if (!session) return null;

    return await prisma.review.findFirst({
      where: {
        movieId,
        userId: session.user?.id,
      },
    });
  },
);

export interface GetReviewProps extends Review {
  user: User;
  isLiked: boolean;
}

// 영화 리뷰 3개 조회 (상세 페이지)
export const getReviewsByMovieLimit = cache(
  async (movieId: string): Promise<GetReviewProps[]> => {
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
  },
);

export interface GetAllReviews extends Review {
  user: User;
  isLiked: boolean;
}

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

// 리뷰 좋아요 토글
export const toggleLikeReview = async (formData: FormData): Promise<void> => {
  const session = await getServerSession();

  if (!session) return;

  const userId = session.user?.id as string;
  const reviewId = formData.get("reviewId") as string;
  const movieId = formData.get("movieId") as string;

  const existingLike = await prisma.reviewLike.findFirst({
    where: {
      userId,
      reviewId,
    },
  });

  if (existingLike) {
    // 좋아요 취소
    await prisma.reviewLike.delete({
      where: {
        id: existingLike.id,
      },
    });

    revalidatePath(`/movie/${movieId}`);
  } else {
    // 좋아요 추가
    await prisma.reviewLike.create({
      data: {
        userId,
        reviewId,
      },
    });

    revalidatePath(`/movie/${movieId}`);
  }
};
