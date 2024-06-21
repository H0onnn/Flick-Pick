"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidatePath } from "next/cache";

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
