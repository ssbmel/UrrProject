import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function POST(request: NextRequest) {
  const { user_id, product_id, name, amount, quantity } = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase.from("cart").insert([{ user_id, product_id, name, amount, quantity }]);

  return NextResponse.json(data, { status: 200 });
}

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const { data } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId || "");

  return NextResponse.json(data, { status: 200 });
}
