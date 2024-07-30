"use client";

import { useQuery } from "@tanstack/react-query";

const UserCommentList = async () => {
  const response = await fetch("/api/products/comment");
  const data = response.json();
  return data;
};

export const useProductComment = () => {
  return useQuery({
    queryKey: ["productComment"],
    queryFn: UserCommentList
  });
};
