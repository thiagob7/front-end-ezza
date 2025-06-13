import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};

        if (username === "admin" && password === "123456") {
          return { id: "1", name: "Administrador", email: "admin@example.com" };
        }
        if (username === "admin2" && password === "123456") {
          return {
            id: "2",
            name: "Administrador2",
            email: "admin2@example.com",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
