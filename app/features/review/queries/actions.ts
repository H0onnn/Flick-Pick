"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/shared/lib/next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { PostReviewDto, Review } from "@/app/features/review/models";
import { User } from "@/app/features/auth/models";

// 리뷰 작성
export const postReview = async (body: PostReviewDto): Promise<void> => {
  const session = await getServerSession(authOptions);

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
  const session = await getServerSession(authOptions);

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
  const session = await getServerSession(authOptions);

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

interface GetRecentReviewProps extends Review {
  user: User;
  movie: {
    id: string;
    title: string;
    overview: string;
    poster: string;
    releaseDate: string;
  };
}

// 가장 최근 작성된 리뷰 6개 조회
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
      },
    });
  },
);

// 영화에 대한 내 리뷰 조회
export const getMyReviewByMovie = cache(
  async (movieId: string): Promise<Review | null> => {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    return await prisma.review.findFirst({
      where: {
        movieId,
        userId: session.user?.id,
      },
    });
  },
);

// 영화 리뷰 조회
export const getReviewsByMovie = cache(
  async (movieId: string): Promise<Review[]> => {
    return await prisma.review.findMany({
      where: {
        movieId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
);
