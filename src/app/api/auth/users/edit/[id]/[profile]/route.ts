import { v4 as uuidv4 } from "uuid";
import { createClient } from "../../../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();
  const { file, userId } = await req.json();

  const { data: imgData, error } = await supabase.storage.from("profile").upload(`${userId}/${uuidv4()}.png`, file);
  /* 우선 이미지를 storage로 업로드한다. */

  if (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ imgData }, { status: 200 });
};

/* export const GET = async (req: NextRequest, { params }: { params: { userId: string; file: { path: string } } }) => {
  const supabase = createClient();
  const { userId, file } = params;
  const { data } = supabase.storage.from(`profile/${userId}`).getPublicUrl(file.path);
  // 업로드한 이미지에 대한 URL을 받아온다.

  return data.publicUrl;
}; */
