import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { searchWord } = await request.json();
  const { data: productTitle, error } = await supabase
    .from("products")
    .select("*")
    .textSearch("title", `${searchWord}`);

  if (error) {
    console.log("error message:", error.message);
    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  return NextResponse.json({ productTitle }, { status: 200 });
}
