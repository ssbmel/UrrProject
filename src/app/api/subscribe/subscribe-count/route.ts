import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const infuserId = searchParams.get("infuser_id");
  const supabase = createClient();

  if (!infuserId) {
    return NextResponse.json({ error: "Missing influencer ID" }, { status: 400 });
  }

  const { count, error } = await supabase
    .from("subscribe")
    .select("*", { count: "exact", head: true })
    .eq("infuser_id", infuserId);

  if (error) {
    console.log("Error fetching subscription count:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ count });
}
