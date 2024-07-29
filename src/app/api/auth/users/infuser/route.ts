import { NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase.from("users").select("*").eq("role", "인플루언서").eq("approve", false);

  if (error) {
    console.log("error message:", error.message);
    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const { userId } = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase.from("users").update({ approve: true }).eq("id", userId);
  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json({ message: "인플루언서 등록 성공" }, { status: 200 });
}
