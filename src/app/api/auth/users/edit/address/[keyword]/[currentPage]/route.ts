import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { keyword: string; currentPage: number } }) => {
  const { keyword, currentPage } = params;

  const res = await fetch(
    `https://business.juso.go.kr/addrlink/addrLinkApi.do?countPerPage=7&currentPage=${currentPage}&keyword=${keyword}&confmKey=${process
      .env.NEXT_PUBLIC_ADDRESS_API_KEY!}&resultType=json`
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Server response error:", errorData);
    return NextResponse.json(errorData, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json(data, { status: 200 });
};
