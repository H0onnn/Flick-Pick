"use server";

import prisma from "@/app/shared/lib/prisma";
import { MovieDetail } from "../models";

export const saveMovie = async (movieDetail: MovieDetail): Promise<void> => {
  const existingMovie = await prisma.movie.findFirst({
    where: {
      id: String(movieDetail.id),
    },
  });

  if (existingMovie) return;

  await prisma.movie.create({
    data: {
      id: String(movieDetail.id),
      title: movieDetail.title,
      overview: movieDetail.overview,
      poster: movieDetail.poster_path,
      releaseDate: movieDetail.release_date,
      createdAt: new Date(),
    },
  });
};
