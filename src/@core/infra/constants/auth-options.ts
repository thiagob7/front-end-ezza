import { randomUUID } from "crypto";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};

        if (username === env.USERNAME && password === env.PASSWORD) {
          return { id: randomUUID() };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: env.NEXTAUTH_SECRET,
};
