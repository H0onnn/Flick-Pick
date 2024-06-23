import { cache } from "react";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";

export const getMyWishMovies = cache(async () => {
  const session = await getServerSession();

  const user = session?.user;

  if (!user) return null;

  return await prisma.like.findMany({
    where: {
      userId: user.id,
    },
    include: {
      movie: true,
    },
  });
});
