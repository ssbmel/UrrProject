"use client";

import { useQuery } from "@tanstack/react-query";

const LoginUserData = async () => {
  const response = await fetch("/api/auth/users");
  const data = response.json();
  return data;
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: () => LoginUserData(),
    select: (data) => data?.userInfo.data
  });
};
