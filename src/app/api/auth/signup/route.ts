import supabase from '../../../../../supabase/client';

type FormState = {
  email: string;
  password: string;
  nickname: string;
};

export async function POST(request: Request) {
  const { email, password, nickname } = (await request.json()) as FormState;
  console.log(email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password
    // options: {
    //   data: {
    //     nickname
    //   }
    // }
  });
  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }
}
