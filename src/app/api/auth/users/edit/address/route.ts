import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const keyword = req.nextUrl.searchParams.get("keyword");
    const currentPage = req.nextUrl.searchParams.get("currentPage");

    const res = await fetch(
      `https://business.juso.go.kr/addrlink/addrLinkApi.do?countPerPage=8&currentPage=${currentPage}&keyword=${keyword}&confmKey=${process
        .env.NEXT_PUBLIC_ADDRESS_API_KEY!}&resultType=json`
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server response error:", errorData);
      throw new Error(`HTTP ERROR OCCURED. status: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
    console.log(error);
  }
};
