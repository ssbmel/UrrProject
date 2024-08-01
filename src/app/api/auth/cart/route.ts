import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function GET(request: NextRequest) {
  const userId = request.json();
  console.log("route 리퀘스트======", request);

  const supabase = createClient();
  const { data } = await supabase.from("cart").select("*").eq("user_id", userId).maybeSingle();

  return NextResponse.json(data, { status: 200 });
}
