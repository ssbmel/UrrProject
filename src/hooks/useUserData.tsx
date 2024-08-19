"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "../../supabase/client";

const LoginUserData = async () => {
  const userData = await getUserData();
  if (!userData.session) {
    return null;
  }
  const response = await fetch("/api/auth/users");
  const data = response.json();
  return data;
};

const getUserData = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data;
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: () => LoginUserData(),
    select: (data) => data?.userInfo.data
  });
};
