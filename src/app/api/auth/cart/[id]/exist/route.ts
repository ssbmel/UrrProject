import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../../supabase/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { user_id } = await request.json();

  const { data } = await supabase.from("cart").select("*").eq("product_id", params.id).eq("user_id", user_id);

  return NextResponse.json(data);
}
