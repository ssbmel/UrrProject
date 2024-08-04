"use client";

import { useQuery } from "@tanstack/react-query";

const userCartList = async (userId: string) => {
  const response = await fetch("/api/auth/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id: userId })
  });
  const data = response.json();
  return data;
};

export const useUserCartItems = (userId: string) => {
  const { data, error } = useQuery({
    queryKey: ["allCartItems", userId],
    queryFn: () => userCartList(userId)
  });
  console.log(data);
  if (error) {
    console.log(error);
  }
  return data;
};
