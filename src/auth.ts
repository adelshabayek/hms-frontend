import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // Hardcoded test accounts
        if (credentials.username === "admin" && credentials.password === "Admin123!") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            roles: ["admin"],
            given_name: "Admin",
            family_name: "User",
          };
        }

        if (credentials.username === "dr.chen" && credentials.password === "Doctor123!") {
          return {
            id: "2",
            name: "Dr. Chen",
            email: "chen@example.com",
            roles: ["doctor"],
            given_name: "Dr.",
            family_name: "Chen",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Map user properties to token on first sign in
        token.roles = (user as any).roles || [];
        token.given_name = (user as any).given_name;
        token.family_name = (user as any).family_name;
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
