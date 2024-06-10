import NextAuth from "next-auth/next";
import { authOptions } from "@/app/shared/lib/next-auth";
import { AuthOptions } from "next-auth";

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
