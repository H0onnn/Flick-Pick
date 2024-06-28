import { cache } from "react";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";

import { fetchTMDB } from "@/app/shared/apis";
import { MovieDetail } from "../models";

export const isLikedMovie = cache(
  async (userId: string, movieId: string): Promise<boolean> => {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        movieId,
      },
    });

    return !!existingLike;
  },
);

export const getMovieDetail = cache(
  async (movieId: string): Promise<MovieDetail> => {
    const session = await getServerSession();
    const userId = session?.user?.id;

    const movieDetail = await fetchTMDB.get(
      `movie/${movieId}?append_to_response=credits&language=ko-KR`,
      {
        next: { tags: ["movieDetail"] },
      },
    );

    let isLiked = false;
    if (userId) {
      const existingLike = await isLikedMovie(userId, movieId);

      isLiked = !!existingLike;
    }

    return { ...movieDetail, isLiked };
  },
);
