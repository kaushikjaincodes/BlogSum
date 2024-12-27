import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

interface User {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

export const GET = async () => {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users!");
    }

    return NextResponse.json(users);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch users!");
  }
};
