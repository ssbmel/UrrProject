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

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export const useUserCartItems = (userId: string) => {
  return useQuery({
    queryKey: ["allCartItems", userId],
    queryFn: () => userCartList(userId)
  });
};
