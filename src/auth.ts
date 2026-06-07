import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        // Map Keycloak claims to token
        token.roles = profile.roles || [];
        token.given_name = profile.given_name;
        token.family_name = profile.family_name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.roles = token.roles as string[];
        session.user.given_name = token.given_name as string;
        session.user.family_name = token.family_name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
