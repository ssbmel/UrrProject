export const userSignUp = async ({
  email,
  password,
  nickname
}: {
  email: string;
  password: string;
  nickname: string;
}) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, nickname })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server response error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    console.log(data);
    if (!data.errorMsg) {
      alert('로그인 성공!');
    } else {
      alert(`로그인 에러: ${data.errorMsg}`);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
