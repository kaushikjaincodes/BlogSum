import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

type Props = {
  params: {
    slug: string;
  };
};

export const GET = async (
  _request: Request,
  context: Props
) => {
  const { slug } = context.params;

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

export const DELETE = async (
  _request: Request,
  context: Props
) => {
  const { slug } = context.params;

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