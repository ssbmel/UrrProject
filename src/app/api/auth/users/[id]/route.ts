import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../../../supabase/client';

export async function GET(req: NextRequest) {
  const { id } = useParams();

  console.log(id); /* id를 받아온다. */

  let { data: users, error } = await supabase.from('users').select('*').eq('id', id);

  if (error) {
    console.log(error.message);
  }

  return NextResponse.json(users, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  /* const {nickname, profile_url} = req.json()

  const { data, error } = await supabase
  .from('users')
  .update({nickname, profile_url})
  .eq('some_column', 'someValue')
  .select()

  if(error) {
    console.log(error.message)
  }

  return NextResponse.json(data, {status: 200}); */
}
