import { NextResponse } from "next/server";
import { createClient } from "../../../../../../../supabase/client";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase.from("users").select("*").eq("approve", true).eq("role", "인플루언서");

  if (error) {
    console.log("error message:", error.message);
    return NextResponse.json(error.message, { status: 400 });
  }

  return NextResponse.json({ data });
  
}
