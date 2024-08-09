import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(params.id);

  const supabase = createClient();
  const { id } = params;

  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

  if (error) {
    console.log(error.message);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const supabase = createClient();
  const { id, nickname, profile_url, address, phonenum, name } = await req.json();

  const { data, error } = await supabase
    .from("users")
    .update({ nickname, profile_url, address, phonenum, name })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
