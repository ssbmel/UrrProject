"use client";

import { useQuery } from "@tanstack/react-query";

const UserCommentList = async (id: string) => {
  const response = await fetch(`/api/products/comment/${id}`);
  const data = response.json();
  return data;
};

export const useProductComment = (id: string, restart: boolean) => {
  return useQuery({
    queryKey: ["productComment", id, restart],
    queryFn: () => UserCommentList(id)
  });
};
