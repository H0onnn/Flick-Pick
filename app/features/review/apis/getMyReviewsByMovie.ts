import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";
import { Review } from "../models";

// 영화에 대한 내 리뷰 조회 (마이 페이지)
export const getMyReviewByMovie = async (
  movieId: string,
): Promise<Review | null> => {
  const session = await getServerSession();

  if (!session) return null;

  return await prisma.review.findFirst({
    where: {
      movieId,
      userId: session.user?.id,
    },
  });
};
