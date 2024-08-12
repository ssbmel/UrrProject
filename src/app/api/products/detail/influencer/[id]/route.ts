import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../../supabase/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { id } = params;

  const { data, error } = await supabase.from("products").select("*").eq("user_id", id);

  if (error) {
    return NextResponse.json({ error, errorMessage: error }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
