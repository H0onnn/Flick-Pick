"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidatePath } from "next/cache";

export const toggleLikeReview = async (
  formData: FormData,
): Promise<void | { error: string }> => {
  const session = await getServerSession();

  if (!session) return;

  const userId = session.user?.id as string;
  const reviewId = formData.get("id") as string;

  const existingLike = await prisma.reviewLike.findFirst({
    where: {
      userId,
      reviewId,
    },
  });

  try {
    if (existingLike) {
      await prisma.reviewLike.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.reviewLike.create({
        data: {
          userId,
          reviewId,
        },
      });
    }
  } catch (error) {
    return {
      error: "좋아요 요청을 보내는 동안 오류가 발생했어요 :(",
    };
  } finally {
    revalidatePath("/movie");
  }
};
