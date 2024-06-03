"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { PostReviewDto } from "../models";

export const postReview = async (body: PostReviewDto) => {
  const session = await getServerSession(authOptions);

  await prisma.review.create({
    data: {
      ...body,
      userId: session?.user?.id as string,
    },
  });

  revalidatePath(`/movie/${body.movieId}`);
};
