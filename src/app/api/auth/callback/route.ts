import { NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const supabase = createClient();
  const profile_url =
    "https://fikdisavtipodbzfiafd.supabase.co/storage/v1/object/sign/profile/default_profile_image.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlL2RlZmF1bHRfcHJvZmlsZV9pbWFnZS5qcGciLCJpYXQiOjE3MjE5NTk1NzEsImV4cCI6MTc1MzQ5NTU3MX0.5HA2Zi0VvyWU2sGl-ozxJWgqKpmgWF6871mQL8h4ooo&t=2024-07-26T02%3A06%3A11.238Z";

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    const kakaoUser = data.user;
    console.log("카카오 로그인 :", kakaoUser);

    if (!error) {
      if (kakaoUser) {
        const { error } = await supabase.from("users").insert({
          id: kakaoUser.id,
          email: kakaoUser.email,
          nickname: kakaoUser.user_metadata.user_name,
          profile_url: profile_url
        });
      }
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
