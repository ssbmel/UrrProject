'use client';

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";

export default function StartChat(owner_id: string) {
  const userdata = useUserData().data;
  const supabase = createClient();
  const router = useRouter();

  const checkOwnerChannel = async (): Promise<number | null> => {
    const { data, error } = await supabase
      .from("chat_channels")
      .select("channel_id")
      .eq("owner_id", owner_id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return data.channel_id;
    }
  };

  const createNewSubscribe = async () => {
    //유저의 대화구독목록 불러오기
    const user_id = userdata.id
    const channel_id = await checkOwnerChannel();
    if (channel_id) {
      const { data, error } = await supabase
        .from('chat_subscribe')
        .insert({
          channel_id: channel_id,
          user_id: user_id
        })
    }
    router.push('/chatlist')
  }
  
  createNewSubscribe();
}