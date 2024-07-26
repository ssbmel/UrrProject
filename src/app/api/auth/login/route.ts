import { NextRequest } from "next/server";
import { createClient } from "../../../../../supabase/server";
import { FormState } from "../../../../../types/auth.type";

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as FormState;

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.log("error message:", error.message);
    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  const user = data.user.id;

  return Response.json({ user }, { status: 200 });
}
