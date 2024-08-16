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

  const getInfluProfile = async (owner_id: string) : Promise<string | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('profile_url')
      .eq('id', owner_id)
      .single();
    if (error) {
      console.log(error)
      return null;
    }
    else
      return data.profile_url;
  }

  const createNewChatChannel = async (owner_id: string, nickname: string) => {
    const profile_url = await getInfluProfile(owner_id);
    const { data, error } = await supabase
      .from('chat_channels')
      .insert({
        owner_id: owner_id,
        channel_name: nickname,
        owner_profile_url: profile_url
    })
    if (error)
      console.log(error)
   
  }

  return (
    <>
      <div className=" p-5 h-[700px] whitespace-nowrap">
        <h2 className="text-xl mb-2">관리자 페이지</h2>
        {isSuccess &&
          influencerApproveList?.map((inf: any, index: number) => {
            return (
              <div key={index} className="flex flex-col">
                <div>닉네임: {inf.nickname} </div>
                <div>확인 링크: {inf.account_link}</div>
                <button
                  onClick={() => {
                    influencerApproveHandler(inf.id);
                    createNewChatChannel(inf.id, inf.nickname)
                  }}
                  className="w-10 bg-[#1A82FF] p-1 rounded-md ml-2"
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
