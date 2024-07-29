import { createClient } from "../../../../supabase/client";
import { AddressProps } from "../../../../types/addr.type";

export const patchUserFromUserId = async () => {};

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
