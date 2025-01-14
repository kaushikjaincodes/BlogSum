import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {PrismaAdapter} from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/app/lib/db"
import bcrypt from "bcrypt"

export const { handlers:{GET, POST}, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
  session : {strategy : "jwt"}, 
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
        
    }),
  ],
})
