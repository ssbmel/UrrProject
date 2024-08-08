"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StartChat from "./StartChat";
import { useRouter } from "next/navigation";


export default function ChatList() {
  const userdata = useUserData().data;
  const supabase = createClient();
  const router = useRouter();

  const [chatListData, setChatListData] = useState<({ channel_id: number; channel_name: string | null; owner_id: string; owner_profile_url: string | null; created_at: string; message: string | null; } | undefined) [] | null>(null);
  const [channelList, setChannelList] = useState<number[] | null>(null);
  const [myChannel, setMyChannel] = useState<{ channel_id: number; channel_name: string | null; owner_id: string; owner_profile_url: string | null; created_at: string; message: string | null; } | null>(null);

  const getMyChannel = async () => {
    //나의 채팅 채널 불러오기
    const user_id = userdata.id
    const { data, error } = await supabase
      .from('chat_channels')
      .select('*')
      .eq('owner_id', user_id)
      .single()
    if (data) {
      const response = await getlastMessage(data.channel_id, data.owner_id);
      if (response?.time != undefined && response?.message != undefined) {
        const channel_data = {
          channel_id: data.channel_id,
          channel_name: data.channel_name,
          owner_id: data.owner_id,
          owner_profile_url: data.owner_profile_url,
          created_at: response?.time,
          message: response?.message
        }
        setMyChannel(channel_data);
      }

    }
  }

  const matchLastMessage = () => {

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
        const channelListDatas = await Promise.all(data.map(async (channel) => {
          const response = await getlastMessage(channel.channel_id, channel.owner_id);
          if (response?.time != undefined && response?.message != undefined) {
            return {
              channel_id: channel.channel_id,
              channel_name: channel.channel_name,
              owner_id: channel.owner_id,
              owner_profile_url: channel.owner_profile_url,
              created_at: response?.time,
              message: response?.message
            }
          }
        }))
        setChatListData(channelListDatas);
      }
    }
  }

  const getlastMessage = async (channel_id: number, owner_id: string): Promise<{ time: string, message: string } | null> => {
    //유저의 마지막 대화 불러오기
    //실시간
    const user_id = await userdata.id;
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq("channel_id", channel_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (error) {
      console.log(error);
      return null;
    }
    else {
      const message = JSON.parse(JSON.stringify(data.content)).message as string;
      const time = data.created_at.slice(11, 16) as string;
      return { time, message }

      // if (owner_id == user_id) {
      //   setMyMessages({
      //     created_at: time,
      //     message: message
      //   })
      // } else {
      //   setMessages((pre) => {
      //     if (pre == null) {
      //       return [{ created_at: time, message: message }];
      //     } else {
      //       return [...pre, { created_at: time, message: message }];
      //     }
      //   })
      // }
    }
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

  const clickChat = (channel_id : number) => {
    const id = channel_id.toString()
    router.push(`/chatlist/[${id}]`)
  }

  return (
    <div className="mt-1 flex flex-col">
      <div className="w-[343px] mx-auto flex flex-col justify-center">
        {(myChannel != undefined) ? 
          <div onClick={()=>clickChat(myChannel.channel_id)}>
          <div key={myChannel.channel_id} className={(myChannel != null) ? "w-[343px] h-[73px] relative flex flex-row" : 'hidden'}>

            <div className="relative flex-none w-[68px] h-[68px]">
              {myChannel.owner_profile_url && (
                <Image fill priority={true} src={myChannel.owner_profile_url} alt="owner profile" className="object-cover rounded-[6px]" />
              )}
            </div>
            <div className="flex flex-col ml-[8px] mr-[12px]">
              <label className="text-[18px] font-medium">{myChannel.channel_name}</label>
              <label className="text-[16px] font-light">{myChannel.message}</label>
              <label className="text-[12px] font-normal text-[#989C9F]">{myChannel?.created_at}</label>
            </div>

          </div>
        </div>
         : <></>}
        
      </div>
      <div className="w-[343px] mx-auto flex flex-col justify-center">
        { (chatListData != undefined) ? chatListData.map((channel) => (
          <Link key={channel?.channel_id} href={`/chatlist/[${channel?.channel_id}]`}>
            <div className="w-[343px] h-[73px] relative flex flex-row">
              <div className="relative flex-none w-[68px] h-[68px]">
                {channel?.owner_profile_url && (
                  <Image fill priority={true} src={channel.owner_profile_url} alt="owner profile" className="object-cover rounded-[6px]" />
                )}
              </div>
              <div className="flex flex-col ml-[8px] mr-[12px]">
                <label className="text-[18px] font-medium">{channel?.channel_name}</label>
                <label className="text-[16px] font-light">{channel?.message}</label>
                <label className="text-[12px] font-normal text-[#989C9F]">{channel?.created_at}</label>
              </div>
            </div>
          </Link>
        )) : <></>}
      </div>
      <div>
        테스트
        {/* <StartChat owner_id='123'/> */}
      </div>
    </div>
  );
}