"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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
