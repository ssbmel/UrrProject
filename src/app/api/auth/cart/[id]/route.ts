import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data } = await supabase.from("cart").select("*").eq("product_id", params.id);

  return NextResponse.json(data);
}
