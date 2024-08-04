import { NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function DELETE() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("error message:", error.message);
    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  return NextResponse.json({ status: 200 });
}
