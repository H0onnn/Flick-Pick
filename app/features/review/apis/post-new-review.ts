"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { revalidatePath } from "next/cache";
import { PostReviewDto } from "../models";

export const postNewReview = async (body: PostReviewDto): Promise<void> => {
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
