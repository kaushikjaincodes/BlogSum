import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import {PrismaAdapter} from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/app/lib/db"
import bcrypt from "bcrypt"
import { saltAndHash } from "./utils/helper"

export const { handlers:{GET, POST}, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
  session : {strategy : "jwt"}, 
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // Credentials({
    //   name:"Credentials",
    //     credentials:{
    //         email:{
    //             label:"Email",
    //             type:"email",
    //             placeholder:"Email",
    //             required:true,
    //         },
    //         password:{
    //             label:"Password",
    //             type:"password",
    //             placeholder:"Password",
    //             required:true,
    //         },
    //     },
    //     authorize:async (credentials)=>{
    //         if( !credentials ||!credentials.email || !credentials.password){
    //             return null;
    //         }
    //         const email = credentials.email as string;
    //        const hash = saltAndHash(credentials.password);
            
    //        let user = await prisma.user.findUnique({
    //             where: {
    //                 email
    //             }
    //         });
    //         if(!user){
    //             user = await prisma.user.create({
    //               data:{
    //                 email,
    //                 hashedPassword: hash,
    //               }
    //             })
    //         }else{
    //           const isMatch = bcrypt.compareSync(credentials.password as string, user.hashedPassword as string);
    //           if(!isMatch){
    //             throw new Error("Invalid Credentials");
    //           }
    //         }
    //         return user;
    //     },  
    // }),
  ],
})
