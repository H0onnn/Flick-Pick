"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidateTag } from "next/cache";

export const toggleLikeMovie = async (formData: FormData): Promise<void> => {
  const session = await getServerSession();

  if (!session) return;

  const userId = session.user?.id as string;
  const movieId = formData.get("movieId") as string;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId,
      movieId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    revalidateTag("movieDetail");
  } else {
    await prisma.like.create({
      data: {
        userId,
        movieId,
      },
    });

    revalidateTag("movieDetail");
  }
};
