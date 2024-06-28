"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidatePath } from "next/cache";
import { PostReviewDto } from "../models";

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
