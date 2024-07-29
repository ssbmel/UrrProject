import { NextResponse } from "next/server";

export const kakaoSignUp = async () => {
  try {
    const response = await fetch("/api/auth/login/kakao", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { data } = await response.json();
    console.log("카카오 서비스", data);
    return data;
    // return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
  }
};
