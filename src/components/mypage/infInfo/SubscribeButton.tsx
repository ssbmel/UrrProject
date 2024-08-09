"use client";

import React from "react";

import { InfSubscribe, User } from "../../../../types/common";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import EmptyHeartIcon from "../../../../public/icon/emptyheart.svg";
import FullHeartIcon from "../../../../public/icon/fullheart.svg";
import { useUserData } from "@/hooks/useUserData";
import { PublicUser } from "../../../../types/auth.type";

interface Props {
  inf: PublicUser;
}

const SubscribeButton = ({ inf }: Props) => {
  const { data: user } = useUserData();

  /* 
  infId : 인플루언서 id
  user : 현재 로그인한 사용자 정보(id 포함)


  로직 : 빈 하트 누르면 구독, 하트 누르면 구독 취소, 이 페이지에 들어왔을 때 구독상태 보여주기


  필요한 데이터 : 현재 로그인한 사용자가, 현재 인플루언서를 구독했는지 여부


  현재 구독 로직이 토글 형태로 되어있지 않음 또한 로직이 분리되지 않아 재사용 불가
  토글 형태의 로직으로 전환하고 로직 분리 필요
  
   */

  /* ...... */

  const [subscribeIds, setSubscribeIds] = useState<string[]>([]);

  const getSubscribeData = async () => {
    try {
      const response = await fetch(`/api/subscribe?user_id=${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubscribeIds(data.map((d: InfSubscribe) => d.infuser_id));
    } catch (error) {
      console.log("Failed to fetch subscription data:", error);
    }
  }; /* 구독 여부 데이터 */

  useEffect(() => {
    getSubscribeData();
  }, [user]); /* 구독 여부 데이터 로드시 표시 */

  const subscribedHandler = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, inf: User) => {
    e.stopPropagation();
    const newInfUser: InfSubscribe = {
      user_id: user.id,
      infuser_id: inf.id
    };
    subscribedMutation(newInfUser);
  }; /* 구독 핸들러 */

  const subscribedInfUser = async (data: InfSubscribe) => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    await getSubscribeData();
    return response.json();
  }; /* 구독으로 데이터 업데이트 */

  const { mutate: subscribedMutation } = useMutation<InfSubscribe, unknown, InfSubscribe>({
    mutationFn: (data) => subscribedInfUser(data)
  }); /* '구독' 으로 서버의 구독 상태 업데이트 */

  const cancelSubscribedInfUser = async (data: InfSubscribe) => {
    if (!data.user_id || !data.infuser_id) return;
    const response = await fetch("/api/subscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    await getSubscribeData();
    return response.json();
  }; /* 구독취소로 데이터 업데이트 */

  const { mutate: cancelSubscribedMutation } = useMutation<InfSubscribe, unknown, InfSubscribe>({
    mutationFn: (data) => cancelSubscribedInfUser(data)
  }); /* '구독 취소' 로 서버의 구독 상태 업데이트 */

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default SubscribeButton;
