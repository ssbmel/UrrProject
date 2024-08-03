"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ChatList() {
  const userdata = useUserData().data;
  const supabase = createClient();

  const [chatListData, setChatListData] = useState<{ channel_id: number; channel_name: string | null; created_at: string; owner_id: string; }[] | null>(null);
  const [channelList, setChannelList] = useState<number[] | null>(null);
  const [myChannel, setMyChannel] = useState<{ channel_id: number; channel_name: string | null; created_at: string; owner_id: string; } | null>(null);

  const getMyChannel = async () => {
    //나의 채팅 채널 불러오기
    const user_id = userdata.id
    const { data, error } = await supabase
      .from('chat_channels')
      .select('*')
      .eq('owner_id', user_id)
      .single()
    if (data) {
      const channel_data = {
        channel_id: data.channel_id,
        channel_name: data.channel_name,
        created_at: data.created_at,
        owner_id: data.owner_id
      }
      setMyChannel(channel_data)
    }
  }

  const getChatList = async () => {
    //유저의 대화구독목록 불러오기
    const user_id = userdata.id
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
  }

  useEffect(() => {
    if (userdata != undefined) {
      getChatList();
      const approve = userdata.approve
      if (approve) {
        getMyChannel();
      }
    }
  }, [userdata])
  useEffect(() => {
    getChatListData(channelList);
  }, [channelList])
  return (
    <div>
      <div>
        <div key={myChannel?.channel_id} className={(myChannel != null) ? "category-item text-center p-1  min-w-[100px]" : 'hidden'}>
          <p className="text-sm font-normal">{myChannel?.channel_name}</p>
          <Link href={{
            pathname: `/chatlist/chat`,
            query: { list: myChannel?.channel_id },
          }}
          >내 채팅방 입장하기</Link>
        </div>
      </div>
      <div>
        {chatListData?.map((channel) => (
          <div key={channel.channel_id} className="category-item text-center p-1  min-w-[100px]">
            <p className="text-sm font-normal">{channel.channel_name}</p>
            <Link href={{
              pathname: `/chatlist/chat`,
              query: { list: channel.channel_id },
            }}
            >{channel.channel_name}의 채팅방 입장하기</Link>
          </div>
        ))}
      </div>

    </div>
  )
}