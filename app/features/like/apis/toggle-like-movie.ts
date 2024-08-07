"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidateTag } from "next/cache";

export const toggleLikeMovie = async (
  formData: FormData,
): Promise<void | { error: string }> => {
  const session = await getServerSession();

  if (!session) return;

  const userId = session.user?.id as string;
  const movieId = formData.get("id") as string;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId,
      movieId,
    },
  });

  try {
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId,
          movieId,
        },
      });
    }
  } catch (error) {
    return {
      error: "좋아요 요청을 보내는 동안 오류가 발생했어요 :(",
    };
  } finally {
    revalidateTag("movieDetail");
  }
};
