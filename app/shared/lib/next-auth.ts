import { type AuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/shared/lib/prisma";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
};
