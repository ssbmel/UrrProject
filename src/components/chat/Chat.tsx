"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { channel } from "diagnostics_channel";

export default function Chat() {
  const userdata = useUserData().data;
  const supabase = createClient();

  const createChatRoom = () => {
    //유저의 대화 시작하기
  }
  const enterChatChannel = () => {
    //유저의 대화방 입장하기
  }

  const getChatMessages = async () => {

    const user_id = userdata.id
    const approve = userdata.approve
    if (approve) {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('channel_id', 1)
      console.log(data)
    } else {
      const influ_id = 'e717cc1d-16de-43c6-a90b-a567022b48e0'
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .in('user_id', [user_id, influ_id])
        .eq('channel_id', 1)
      console.log(data)
    }


  }
  const sendChatMessage = () => {

  }
  const receiveChatMessage = () => {

  }

  

  return (
    <>
      
      <button onClick={getChatMessages}>채팅방 입장하기</button>
    </>
  );
}
