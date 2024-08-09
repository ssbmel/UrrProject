import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../../supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase.from("users").select("*").eq("approve", true).eq("role", "인플루언서");
  if (error) {
    console.log("error message:", error.message);
    return NextResponse.json(error.message, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  try {
    const info = await request.json();
    const supabase = createClient();
    const { data, error } = await supabase.from("users").update(info).eq("id", info.id);

    if (error) {
      return alert(`${error.message}`);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "게시물 등록에 실패했습니다." });
  }
}
