import { NextResponse } from "next/server";

export const kakaoSignUp = async () => {
  try {
    const response = await fetch("/api/auth/login/kakao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
  }
};
