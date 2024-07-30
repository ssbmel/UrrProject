import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching data:", error.message);
      return NextResponse.json({ status: "500", message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "200", data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: "500", message: error }, { status: 500 });
  }
}
