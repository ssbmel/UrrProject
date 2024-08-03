'use client';

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";

export default function StartChat(channel_id : number) {
  const userdata = useUserData().data;
  const supabase = createClient();

  const createNewSubscribe = async () => {
    //유저의 대화구독목록 불러오기
    const user_id = userdata.id
    const { data, error } = await supabase
      .from('chat_subscribe')
      .insert({
        channel_id: channel_id,
        user_id: user_id
      })
  }
  createNewSubscribe();
}