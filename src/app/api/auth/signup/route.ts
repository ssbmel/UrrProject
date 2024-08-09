import { NextRequest, NextResponse } from "next/server";
import { FormState } from "../../../../../types/auth.type";
import { createClient } from "../../../../../supabase/server";

export async function POST(request: NextRequest) {
  const profile_url =
    "https://fikdisavtipodbzfiafd.supabase.co/storage/v1/object/sign/profile/default_profile_image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlL2RlZmF1bHRfcHJvZmlsZV9pbWFnZS5qcGciLCJpYXQiOjE3MjE5NTk1NzEsImV4cCI6MTc1MzQ5NTU3MX0.5HA2Zi0VvyWU2sGl-ozxJWgqKpmgWF6871mQL8h4ooo&t=2024-07-26T02%3A06%3A11.238Z";
  try {
    const { email, password, nickname, confirm, selectUser, approve } = (await request.json()) as FormState;

    const supabase = createClient();
    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return NextResponse.json({ error: "회원가입 실패", message: error }, { status: 500 });
    }

    if (userData?.user?.id) {
      if (confirm === "인플루언서") {
        const { data, error } = await supabase.from("users").insert({
          id: userData?.user?.id,
          email,
          nickname,
          account_link: confirm,
          role: selectUser,
          approve,
          profile_url: profile_url
        });

        if (error) {
          console.error("인플루언서 회원가입 실패", error.message);
        }
      } else {
        const { data, error } = await supabase.from("users").insert({
          id: userData?.user?.id,
          email,
          nickname,
          role: selectUser,
          approve,
          profile_url: profile_url
        });
        if (error) {
          console.error("인플루언서 회원가입 실패", error.message);
        }
      }
    }

    return NextResponse.json({ message: "회원가입 성공" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "회원가입 실패", message: error }, { status: 500 });
  }
}
