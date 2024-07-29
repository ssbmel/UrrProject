"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useEffect, useState } from "react";

export default function ChatList() {
  const userdata = useUserData().data;
  const supabase = createClient();

  const [chatListData, setChatListData] = useState<{ channel_id: number; channel_name: string | null; created_at: string; owner_id: string; }[] | null>(null);
  const [channelList, setChannelList] = useState<number[] | null>(null);

  const getChatList = async () => {
    //유저의 대화구독목록 불러오기
  const user_id = userdata.id
  console.log(user_id)
    const { data, error } = await supabase
      .from('chat_subscribe')
      .select('*')
      .eq('user_id', user_id)
    if (data) {
      const channelListData = data.map((channel) => {
        return channel.channel_id
      })
      setChannelList(channelListData)
    }
  }

  const getChatListData = async (chatlist: number[] | null) => {
    //구독리스트의 정보 불러오기
    // const user_id = userdata.id
    // console.log(user_id)
    if (channelList) {
      const { data, error } = await supabase
        .from('chat_channels')
        .select('*')
        .in('channel_id', [...channelList])
      if (data) {
        console.log(data)
        const channelListDatas = data.map((channel) => {
          return {
            channel_id: channel.channel_id,
            channel_name: channel.channel_name,
            created_at: channel.created_at,
            owner_id: channel.owner_id
          }
        })
        setChatListData(channelListDatas)
      }
    }
  }

  const getlastMessage = async (channel_id: number, owner_id: string) => {
    //유저의 마지막 대화 불러오기
    //실시간
    
    // const user_id = userdata.id
    // console.log(user_id)
    // const { data, error } = await supabase
    //     .from('chat_messages')
    //     .select('*')
    //     .in('channel_id', [])
    //   if (data) {
    //     console.log(data)
    //     const channelListDatas = data.map((channel) => {
    //       return {
    //         channel_id: channel.channel_id,
    //         channel_name: channel.channel_name,
    //         created_at: channel.created_at,
    //         owner_id: channel.owner_id
    //       }
    //     })
        
    //   }
  }

  useEffect(() => {
    if (userdata != undefined) getChatList();
  }, [userdata])
  useEffect(()=>{
    getChatListData(channelList);
  },[channelList])
  
  console.log(chatListData);
  return (
    <>
      {chatListData?.map((channel) => (
        <div key={channel.channel_id} className="category-item text-center p-1  min-w-[100px]">
          <p className="text-sm font-normal">{channel.channel_name}</p>
          <button>{channel.channel_name}의 채팅방 입장하기</button>
        </div>
      ))}
    </>
  )
}