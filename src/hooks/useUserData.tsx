"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "../../supabase/client";
import { useEffect, useState } from "react";

const LoginUserData = async () => {
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
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      const data = await getUserData();
      setSessionData(data);
    };

    fetchSessionData();
  }, []);

  return useQuery({
    queryKey: ["userData"],
    queryFn: () => LoginUserData(),
    enabled: !!sessionData,
    select: (data) => data?.userInfo.data
  });
};
