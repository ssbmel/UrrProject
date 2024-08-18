"use client";

import { useUserData } from "@/hooks/useUserData";
import { infUserApprove, updateUserApprove } from "@/services/users/users.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "../../../supabase/client";

export default function AdminPage() {
  const [restart, setRestart] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  const { data: influencerApproveList, isSuccess } = useQuery({
    queryKey: ["infApprove", restart],
    queryFn: infUserApprove
  });
  const mutation = useMutation({
    mutationFn: updateUserApprove,
    onSuccess: () => {
      setRestart(!restart);
    }
  });

  const influencerApproveHandler = (userId: string) => {
    mutation.mutate(userId);
  };

  const { data } = useUserData();
  if (data) {
    if (data?.role !== "관리자") {
      router.push("/");
    }
  }

  const getInfluProfile = async (owner_id: string): Promise<string | null> => {
    const { data, error } = await supabase.from("users").select("profile_url").eq("id", owner_id).single();
    if (error) {
      console.log(error);
      return null;
    } else return data.profile_url;
  };

  const createNewChatChannel = async (owner_id: string, nickname: string) => {
    const profile_url = await getInfluProfile(owner_id);
    const { data, error } = await supabase.from("chat_channels").insert({
      owner_id: owner_id,
      channel_name: nickname,
      owner_profile_url: profile_url
    });
    if (error) console.log(error);
  };

  return (
    <>
      <div className="w-full max-w-[375px] mx-auto">
        <h2 className="p-5 text-xl text-[#1B1C1D]">관리자 페이지</h2>
        <div className="bg-[#F4F4F4] h-2"></div>
      </div>

      <div className="p-4 max-w-[375px] mx-auto">
        {isSuccess &&
          influencerApproveList?.map((inf: any, index: number) => {
            return (
              <div key={index} className="grid grid-cols-[300px_auto] items-center border-b-2 border-[#F4F4F4]">
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="w-[55px]">닉네임</p>
                    <p>{inf.nickname}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap">인증링크</p>
                    <p className="break-words w-[225px]">{inf.account_link}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    influencerApproveHandler(inf.id);
                    createNewChatChannel(inf.id, inf.nickname);
                  }}
                  className="border border-primarynormal text-primarynormal"
                >
                  승인
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
