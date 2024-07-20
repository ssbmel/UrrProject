import { NextResponse } from 'next/server';
import supabase from '../../../../../supabase/client';
import { FormState } from '../../../../../types/auth.type';

export async function POST(request: Request) {
  try {
    const { email, password, nickname } = (await request.json()) as FormState;

    const { error } = await supabase.auth.signUp({
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
    return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
  }
}
