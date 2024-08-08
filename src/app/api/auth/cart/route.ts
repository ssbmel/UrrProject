import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { user_id } = await request.json();

  const { data } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", user_id || "");

  return NextResponse.json(data, { status: 200 });
}
