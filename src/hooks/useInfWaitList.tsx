"use client";

import { infUserApprove } from "@/services/users/users.service";
import { useQuery } from "@tanstack/react-query";

export const InfWaitList = async () => {
  return useQuery({
    queryKey: ["infApprove"],
    queryFn: infUserApprove
  });
};
