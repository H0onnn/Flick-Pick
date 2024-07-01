import { cache } from "react";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { Review } from "../models";
import { User } from "../../auth/models";

export interface GetMyRievewsToMyPageProps extends Review {
  user: User;
  movie: {
    id: string;
    title: string;
    poster: string;
  };
}

export const getMyReviewsToMyPage = cache(
  async (): Promise<GetMyRievewsToMyPageProps[] | null> => {
    const session = await getServerSession();

    if (!session) return null;

    return await prisma.review.findMany({
      where: {
        userId: session.user?.id,
      },
      include: {
        user: true,
        movie: true,
      },
    });
  },
);
