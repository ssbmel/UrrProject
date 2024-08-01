"use client";

import { useQuery } from "@tanstack/react-query";

const UserCartItems = async (userId: string) => {
  const response = await fetch("/api/cart/");
  const data = response.json();
  console.log("훅 data =======", data);
  return data;
};

export const useUserCartItems = (userId: string) => {
  return useQuery({
    queryKey: ["cartItems", userId],
    queryFn: () => UserCartItems(userId)
  });
};
