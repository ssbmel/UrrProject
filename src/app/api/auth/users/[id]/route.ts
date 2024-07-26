import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/client";

export async function PATCH(req: NextRequest) {
  const supabase = createClient();
  const { id, nickname, profile_url, address } = await req.json();

  const { data, error } = await supabase.from("users").update({ nickname, profile_url, address }).eq("id", id).select();

  if (error) {
    console.log(error.message);
  }

  return NextResponse.json(data, { status: 200 });
}
