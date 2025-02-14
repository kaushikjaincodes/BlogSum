import {auth} from "@/auth"
import {  NextResponse } from "next/server";
import type { NextRequest} from "next/server";

const protectedRoutes = ["/api/auth/[...nextauth]","/api/blog/addpost","/api/blog/deletepost","/create"];

export const config={
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default async function middleware(request: NextRequest) {
        const session = await auth();
        const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

        if(!session && isProtected){
            const absoluteUrl = new URL("/",request.nextUrl.origin);
            return NextResponse.redirect(absoluteUrl.toString());
        }
        return NextResponse.next();
}