import { createClient } from "../../../../supabase/client";
import { AddressProps } from "../../../../types/addr.type";
import { editUserData } from "../../../../types/auth.type";

export const patchUserFromUserId = async (editUserData: editUserData) => {
  const { id } = editUserData;
  const res = await fetch(`/api/auth/users/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editUserData)
  });
  if (!res.ok) {
    alert("요청이 정상적으로 수행되지 못했습니다.");
    return;
  }

  return res.json();
};

export const getAddress = async (addressProps: AddressProps) => {
  const { keyword, currentPage } = addressProps;
  const res = await fetch(`/api/auth/users/edit/address/${keyword}/${currentPage}`);
  const data = await res.json();
  return data;
};

export const uploadProfile = async ({ profileData }: { profileData: { userId: string; file: File } }) => {
  const { userId, file } = profileData;
  const res = await fetch(`/api/auth/users/edit/${userId}/${file}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profileData)
  });
  const data = await res.json();
  return data;
};

export const getProfile = async (file: File) => {
  /* "완료" 버튼으로 제출 시, 이미지의 URL을 받아오는 용도 */
};

export const sendResetPasswordEmail = async (email: string) => {
  const supabase = createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/mypage/edit/updatepw"
  });
};

export const updateUserPassword = async (password: string) => {
  const supabase = createClient();
  await supabase.auth.updateUser({ password });
};
