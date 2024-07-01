import { cache } from "react";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";

interface GetMyActivesResponse {
  reviewsCount: number;
  likedMoviesCount: number;
  likedCommentsCount: number;
}

export const getMyActives = cache(async (): Promise<GetMyActivesResponse> => {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    const userId = user.id;

    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        reviews: true,
        likes: true,
        reviewLikes: true,
      },
    });

    return {
      reviewsCount: userData?.reviews.length || 0,
      likedMoviesCount: userData?.likes.length || 0,
      likedCommentsCount: userData?.reviewLikes.length || 0,
    };
  } else {
    return {
      reviewsCount: 0,
      likedMoviesCount: 0,
      likedCommentsCount: 0,
    };
  }
});
