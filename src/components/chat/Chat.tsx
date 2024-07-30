"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useRef, useState } from "react";

export default function Chat() {
  const userdata = useUserData().data;
  const supabase = createClient();

  //const [content, setContent] = useState<{ message : string } | null>(null)
  const [message, setMessage] = useState<String>('');
  const textRef = useRef<HTMLInputElement>(null);
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

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const sendChatMessage = async () => {
    const user_id = userdata.id
    const channel_id = 1;
    //유저가 해당 채팅방을 구독하고 있는지 확인하는 함수 필요
    console.log(message)
    const content = JSON.stringify({
      message : message
    });

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        channel_id: channel_id,
        content:  JSON.parse(content),
        user_id: user_id
      })
      if (error) {
        console.log('채팅 보내기 실패')
        console.log(error)
      }
  }
  
  const receiveChatMessage = () => {

  }



  return (
    <>
      <textarea className="border-style: solid; border-color: rgb(0 0 0);" onChange={handleTextarea}></textarea>
      <button className="border-style: solid; border-color: rgb(0 0 0);" onClick={(message!='') ? sendChatMessage : () => {
        console.log('보낼 내용 없음')
      }}>채팅 보내기</button>
      <button className="border-style: solid; border-color: rgb(0 0 0);" onClick={getChatMessages}>채팅방 입장하기</button>
    </>
  );
}
