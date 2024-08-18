import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const user_id = searchParams.get("user_id") as string;
  
  const supabase = createClient();
  const { data, error } = await supabase.from("subscribe").select("infuser_id").eq("user_id", user_id);
  if (error) {
    console.log("error message:", error.message);
    return NextResponse.json(error.message, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const info = await request.json();
    
    const supabase = createClient();
    const { data, error } = await supabase.from("subscribe").insert(info).select();
    if (error) {
      return console.log(`${error.message}`);
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
    const { data, error } = await supabase.from("subscribe").delete().eq("user_id", info.user_id).eq("infuser_id", info.infuser_id);

    if (error) {
      return console.log(`${error.message}`);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "게시물 등록에 실패했습니다." });
  }
}