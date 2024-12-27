import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse, NextRequest } from "next/server";

// GET request to fetch a post by slug
export const GET = async (request: NextRequest) => {
  // Accessing the params via the request context
  const slug = request.nextUrl.pathname.split("/").pop(); // Extracting slug from the URL path

  if (!slug) {
    return NextResponse.json({ error: "Slug not provided" }, { status: 400 });
  }

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
export const DELETE = async (request: NextRequest) => {
  // Accessing the params via the request context
  const slug = request.nextUrl.pathname.split("/").pop(); // Extracting slug from the URL path

  if (!slug) {
    return NextResponse.json({ error: "Slug not provided" }, { status: 400 });
  }

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
