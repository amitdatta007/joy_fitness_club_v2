// next-auth.d.ts
import { User as UserType } from "./index";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User extends UserType {}

  interface Session {
    user: User;
  }
}

