import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email || "");

  return NextResponse.json(data);
}
