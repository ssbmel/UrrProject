"use client";

import { useQuery } from "@tanstack/react-query";

const userCartList = async (userId: string) => {
  const response = await fetch(`/api/auth/cart?userId=${userId}`);
  const data = response.json();
  return data;
};

export const useUserCartItems = (userId: string) => {
  const { data, error } = useQuery({
    queryKey: ["allCartItems", userId],
    queryFn: () => userCartList(userId)
  });
  if (error) {
    console.log(error);
  }
  console.log(data);
  return data;
};
