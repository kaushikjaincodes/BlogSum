import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

type BlogPost = {
    id: number;
    title: string;
    desc: string;
    img: string;
    userId: string;
    slug: string;
}

export const GET = async (request: Request) => {
    try{
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
        
        if (error) {
            console.error('Supabase error: ', error)
            return NextResponse.json(
                { error: 'Falied to fetch posts'},
                { status: 500}
            )
        }

        return NextResponse.json(posts as BlogPost[])
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}