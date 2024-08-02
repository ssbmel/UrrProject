export const nicknameCheck = async (nickname: string) => {
  const response = await fetch(`/api/auth/signup/nicknamecheck?nickname=${nickname}`);
  const data = await response.json();
  return data;
};
