import { NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  console.log("겟유저 데이타", data);

  if (error) {
    console.log("error message:", error.message);
    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  if (data.user?.id) {
    const userInfo = await supabase.from("users").select("*").eq("id", data.user?.id).single();
    return NextResponse.json({ userInfo }, { status: 200 });
  }
}
