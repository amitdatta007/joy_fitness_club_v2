import NextAuth, { User } from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signinSchema } from "@/schema/auth.schema"
import prisma from "./prisma"
import bcrypt from "bcryptjs";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const { email, password } = await signinSchema.parseAsync(credentials);

        const getUserByEmail = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${email}`);
        const { user: existingUser } = await getUserByEmail.json();

        // const existingUser = await prisma.user.findFirst({
        //   where: { email: email }
        // });

        if (existingUser) {
          const passwordMatch = await bcrypt.compare(password, existingUser.password);

          if (passwordMatch) {
            const { name, email, avatarUrl, role, id } = existingUser;
            return { id, name, email, role, avatarUrl };
          }
        } return null;
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ profile, account }) {
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ token, session }) {
      session.user = token.user as any;
      return session
    },
  }
})