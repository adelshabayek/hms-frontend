import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
        if (!apiKey) {
          console.error("Firebase API Key missing in environment");
          return null;
        }

        try {
          const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              returnSecureToken: true,
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            console.error("Firebase auth error:", data);
            return null;
          }

          const uid = data.localId;
          // Note: Avoid importing firebase-admin here to prevent Edge runtime build errors
          // (Webpack tries to bundle node built-ins like node:crypto when middleware imports this file).
          // For advanced roles, use Firebase Custom Claims or fetch from Firestore via REST API.

          return {
            id: uid,
            name: data.email.split("@")[0],
            email: data.email,
            roles: ["admin"], // default role
            given_name: data.email.split("@")[0],
            family_name: "",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Map user properties to token on first sign in
        token.id = user.id;
        token.roles = (user as any).roles || [];
        token.given_name = (user as any).given_name;
        token.family_name = (user as any).family_name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
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
