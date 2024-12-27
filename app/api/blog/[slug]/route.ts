import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";


// Type definition for route parameters
type RouteParams = {
  params: {
    slug: string;
  };
};


// GET request to fetch a post by slug
export const GET = async (request: Request, { params }: RouteParams) => {
  const { slug } = params;


  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();


    if (error) throw error;


    return NextResponse.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    return NextResponse.json(
      { error: "Failed to fetch post!" },
      { status: 500 }
    );
  }
};


// DELETE request to delete a post by slug
export const DELETE = async (request: Request, { params }: RouteParams) => {
  const { slug } = params;


  try {
    const { error } = await supabase.from("posts").delete().eq("slug", slug);


    if (error) throw error;


    return NextResponse.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json(
      { error: "Failed to delete post!" },
      { status: 500 }
    );
  }
};


