"use server";

import { getServerSession as getSession } from "next-auth/next";
import { authOptions } from "@/app/shared/lib/next-auth";
import { AuthOptions, Session } from "next-auth";

export const getServerSession = async (): Promise<Session | null> => {
  const session = await getSession(authOptions as AuthOptions);

  return session;
};
