"use server";

import prisma from "@/app/shared/lib/prisma";
import { getServerSession } from "@/app/shared/utils";

export const withraw = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
};
