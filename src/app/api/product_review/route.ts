import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data } = await supabase.from("product_review").select("*");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 가져오는 데 실패했습니다." });
  }
}

export async function POST(request: NextRequest) {
  try {
    const info = await request.json();
    const supabase = createClient();
    const { data, error } = await supabase.from("product_review").insert(info).select();
    if (error) {
      return NextResponse.json(error);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "게시물 등록에 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const info = await request.json();
    const supabase = createClient();
    const { data, error } = await supabase.from("product_review").delete().eq("id", info.id);
    if (error) {
      return console.log(`${error.message}`);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "게시물 삭제에 실패했습니다." });
  }
}
