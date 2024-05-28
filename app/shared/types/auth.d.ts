import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line
  interface Session extends DefaultSession {
    user?: {
      id?: string;
    } & DefaultSession["user"];
    accessToken: string;
  }
}
