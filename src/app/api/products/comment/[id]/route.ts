import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();
  const { data, error } = await supabase.from("comments").select("*,users(nickname)").eq("product_id", id);

  if (error) {
    return NextResponse.json({ error: "불러오기 실패", message: error }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
