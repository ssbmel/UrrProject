import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../../supabase/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id } = params;

  const { data, error } = await supabase.from("product_review").select("*").eq("product_id", id);

  if (error) {
    return NextResponse.json({ error: "supabase에서 에러 발생함", errorMessage: error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
