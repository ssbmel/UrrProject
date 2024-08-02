import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const nickname = searchParams.get("nickname");
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("nickname", nickname || "");

  return NextResponse.json(data);
}
