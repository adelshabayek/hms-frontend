import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      roles?: string[];
      given_name?: string;
      family_name?: string;
    } & DefaultSession["user"];
  }

  interface User {
    roles?: string[];
    given_name?: string;
    family_name?: string;
  }
}
