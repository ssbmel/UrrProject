import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/client";

export const POST = async (request: NextRequest) => {
  const supabase = createClient();
  const response = await request.json();

  const { error } = await supabase.from("order").insert(response);

  if (error) {
    console.error(error);
    return NextResponse.json({ status: "500", message: error.message });
  }
  return NextResponse.json({ status: "200" });
};
