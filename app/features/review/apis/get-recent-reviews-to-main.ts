import prisma from "@/app/shared/lib/prisma";
import { User } from "@/app/features/auth/login/models";
import { Review } from "../models";

interface GetRecentReviewProps extends Review {
  user: User;
  movie: {
    id: string;
    title: string;
    overview: string;
    poster: string;
    releaseDate: string;
  };
  likes: {
    id: string;
  }[];
}

export const getRecentReviews = async (): Promise<GetRecentReviewProps[]> => {
  return await prisma.review.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      movie: true,
      likes: true,
    },
  });
};
