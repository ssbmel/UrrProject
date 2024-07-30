import { NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const supabase = createClient();

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    const kakaoUser = data.user;
    // console.log("카카오 로그인 :", kakaoUser);

    if (!error) {
      if (kakaoUser) {
        const { error } = await supabase.from("users").insert({
          id: kakaoUser.id,
          email: kakaoUser.email,
          nickname: kakaoUser.user_metadata.user_name
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
