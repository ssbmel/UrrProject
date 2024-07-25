import { NextResponse } from 'next/server';
import { FormState } from '../../../../../types/auth.type';
import { createClient } from '../../../../../supabase/server';

export async function POST(request: Request) {
  try {
    const { email, password, nickname, confirm } = (await request.json()) as FormState;

    const supabase = createClient();
    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return NextResponse.json({ error: '회원가입 실패', message: error }, { status: 500 });
    }

    if (userData?.user?.id) {
      if (confirm) {
        const { data, error: insertError } = await supabase
          .from('users')
          .insert({ id: userData?.user?.id, email, nickname, account_link: confirm });
      } else {
        const { data, error: insertError } = await supabase
          .from('users')
          .insert({ id: userData?.user?.id, email, nickname });
      }
    }

    return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error', message: error }, { status: 500 });
  }
}
