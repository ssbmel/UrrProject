export type FormState = {
  email: string;
  password: string;
  nickname: string;
  confirm: string;
  selectUser: string;
  approve: boolean;
};

export type editUserData = {
  id: string;
  nickname: string;
  profile_url: string | null;
  address: string | null;
  phonenum: string | null;
  name: string | null;
};
