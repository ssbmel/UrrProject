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
    console.log(response);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
