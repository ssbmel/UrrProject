import { NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function POST() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao"
    // options: {
    //   redirectTo: "https://fikdisavtipodbzfiafd.supabase.co/auth/v1/callback"
    // }
  });

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log("카카오 회원가입 실패");
  }
  return NextResponse.json({ data });
}
