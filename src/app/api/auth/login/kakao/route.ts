import { NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "http://localhost:3000/api/auth/callback"
    }
  });

  if (data) {
    console.log("성공");
    return NextResponse.json({ data }, { status: 200 });
  }

  if (error) {
    console.log("카카오 회원가입 실패");
    return NextResponse.json({ data });
  }
}
