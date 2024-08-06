import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function PUT(request: NextRequest) {
  try {
    const commentData = await request.json();
    const supabase = createClient();

    const { data } = await supabase.from("comments").update({ content: commentData.content }).eq("id", commentData.id);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "수정에 실패했습니다." });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const commentData = await request.json();
    const supabase = createClient();

    const { data, error } = await supabase.from("comments").delete().eq("id", commentData);

    if (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      return NextResponse.json({ error: "삭제에 실패했습니다." });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "삭제에 실패했습니다." });
  }
}
