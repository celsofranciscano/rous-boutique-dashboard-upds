// authOptions.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const userFound = await prisma.tbusers.findUnique({
          where: { email: credentials.email },
          include: { tbroles: true },
        });

        if (!userFound) throw new Error("Usuario no encontrado");

        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
        if (!matchPassword) throw new Error("La contraseña es incorrecta");

        if (userFound.status === false) throw new Error("Tu cuenta está inactiva");

        return {
          email: userFound.email,
          name: `${userFound.firstName} ${userFound.lastName}`,
          image: userFound.profileImage,
          role: userFound.tbroles.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Añadir el rol al token si el usuario está presente
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Esto incluye el JWT completo
      session.user.iat = token.iat; // Esto incluye el JWT completo
      session.user.exp = token.exp; // Esto incluye el JWT completo
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
