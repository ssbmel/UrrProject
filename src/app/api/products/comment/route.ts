import { NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from("comment").select("*,users(nickname)");
  return NextResponse.json(data, { status: 200 });
}
