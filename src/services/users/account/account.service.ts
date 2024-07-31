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

export const sendResetPasswordEmail = async (email: string) => {
  const supabase = createClient();
  await supabase.auth.resetPasswordForEmail(email);
};
