import { NextResponse } from 'next/server';
import supabase from '../../../../../supabase/client';
import { FormState } from '../../../../../types/auth.type';

export async function POST(request: Request) {
  try {
    const { email, password, nickname } = (await request.json()) as FormState;

    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname
        }
      }
    });

    if (error) {
      return NextResponse.json({ error: '회원가입 실패', message: error }, { status: 500 });
    }

    const { data, error: insertError } = await supabase
      .from('users')
      .insert([{ id: userData?.user?.id, email, nickname }]);

    if (insertError) {
      return NextResponse.json({ error: '왜 안됨 ㅠ', message: error }, { status: 500 });
    }

    return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
  }
}
