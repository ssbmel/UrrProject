"use client";

import React from "react";
import { InfSubscribe, User } from "../../../../types/common";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import EmptyHeartIcon from "../../../../public/icon/emptyheart.svg";
import FullHeartIcon from "../../../../public/icon/fullheart.svg";
import { useUserData } from "@/hooks/useUserData";
import { PublicUser } from "../../../../types/auth.type";
import { getSubscribeData } from "@/services/users/subscribe/subscribe.service";
import { useRouter } from "next/navigation";

interface Props {
  inf: PublicUser;
}

const SubscribeButton = ({ inf }: Props) => {
  const router = useRouter();
  const { data: user } = useUserData();
  const [subscribeIds, setSubscribeIds] = useState<string[]>([]);

  useEffect(() => {
    if (user?.id) {
      getSubscribeData(user?.id, setSubscribeIds);
    }
  }, [user]); /* 구독 여부 데이터 로드시 표시 */

  const subscribedHandler = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, inf: User) => {
    e.stopPropagation();
    if (!user) {
      router.push("/login");
    }
    const newInfUser: InfSubscribe = {
      user_id: user.id,
      infuser_id: inf.id
    };
    subscribedMutation(newInfUser);
  };

  const subscribedInfUser = async (data: InfSubscribe) => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    await getSubscribeData(user.id, setSubscribeIds);
    return response.json();
  };

  const { mutate: subscribedMutation } = useMutation<InfSubscribe, unknown, InfSubscribe>({
    mutationFn: (data) => subscribedInfUser(data)
  });

  const cancelSubscribedInfUser = async (data: InfSubscribe) => {
    if (!data.user_id || !data.infuser_id) return;
    const response = await fetch("/api/subscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    await getSubscribeData(user.id, setSubscribeIds);
    return response.json();
  };

  const { mutate: cancelSubscribedMutation } = useMutation<InfSubscribe, unknown, InfSubscribe>({
    mutationFn: (data) => cancelSubscribedInfUser(data)
  });

  return (
    <>
      {subscribeIds.includes(inf.id) ? (
        <button
          onClick={() =>
            cancelSubscribedMutation({
              infuser_id: inf.id,
              user_id: user.id
            })
          }
        >
          <FullHeartIcon />
        </button>
      ) : (
        <button onClick={(e) => subscribedHandler(e, inf)}>
          <EmptyHeartIcon />
        </button>
      )}
    </>
  );
};

export default SubscribeButton;
