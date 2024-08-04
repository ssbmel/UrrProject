import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function POST(request: NextRequest) {
  const { user_id, product_id, name, amount, quantity, main_img, nickname } = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart")
    .insert([{ user_id, product_id, name, amount, quantity, main_img, nickname }]);

  return NextResponse.json(data, { status: 200 });
}
