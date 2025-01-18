import { NextRequest } from "next/server";
import {NextResponse} from "next/server";
import {prisma } from "@/app/lib/db";
interface post{
    title:string;
    desc:string;
    img:string;
    email:string;
}


export async function POST(req:NextRequest){
    const body = await req.json();
    const {title,desc,img,email}  = body as post;
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(!user){
        return NextResponse.json({
            "message": "User not found",
        })
    }
    if(!title || !desc || !img){
        return NextResponse.json({
            "message": "All fields are required",
        })
    }
   const response = await prisma.post.create({
       data:{
           title: title,
           desc: desc,
           image: img,
           slug: title.toLowerCase().replace(/ /g, '-')+"-"+Date.now(),
           userId:user.id
       }
   })
   console.log(response);
   return NextResponse.json({"message": "Post Added succesfully"});
}