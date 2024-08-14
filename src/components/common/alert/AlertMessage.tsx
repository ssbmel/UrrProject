"use client";

import { useUserData } from "@/hooks/useUserData";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../../../supabase/client";
import { useAlertchatStore } from "@/zustand/alertchatStore";
import { useEffect, useState } from "react";

function AlertMessage() {
  const pathname = usePathname();
  const userdata = useUserData().data;
  const supabase = createClient();
  const router = useRouter();

  const { isAlert, setIsAlert, clearData } = useAlertchatStore();
  const [channelList, setChannelList] = useState<{ channel_id: number; owner_id: string; channel_name: string; }[]>([]);
  const [alertData, setAlertData] = useState<{
    created_at: string;
    message: string;
    nickname: string;
    channel_name: string;
    channel_id: number;
  } | null>(null)
  const [myChannelId, setMyChannelId] = useState<number | null>(null)
  const getMyChannelId = async () => {
    const user_id: string = userdata.id
    const { data } = await supabase
      .from('chat_channels')
      .select('channel_id, channel_name')
      .eq('owner_id', user_id)
      .single()
    if (data) {
      setMyChannelId(data.channel_id);
      setChannelList((pre) => {
        return [
          ...pre,
          { channel_id: data.channel_id, owner_id: user_id, channel_name: data.channel_name }
        ]
      });
    }
  }

  const getChannelIdList = async () => {
    const user_id = userdata.id;
    const approve = userdata.approve;
    if (approve) {
      await getMyChannelId();
    }
    const { data } = await supabase
      .from('chat_subscribe')
      .select(`
        channel_id,
        chat_channels(
          owner_id,
          channel_name
        )
        `)
      .eq('user_id', user_id)
      .order('last_time', { ascending: false });

    if (data) {
      data.map((subscribe) => {
        setChannelList((pre) => {
          if (subscribe.chat_channels) {
            return [
              ...pre,
              { channel_id: subscribe.channel_id, owner_id: subscribe.chat_channels.owner_id, channel_name: subscribe.chat_channels.channel_name }
            ]
          } else {
            return [...pre];
          }
        });


      })
    }
  }

  const receiveChatMessage = async () => {
    if (!pathname.startsWith("/chatlist")) {
      const user_id = await userdata.id;
      const approve = await userdata.approve;
      const channelIdList = channelList.map((channel) => { return channel.channel_id })
      const channelsMessage = supabase
        .channel("changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `channel_id=in.(${channelIdList})`
          },
          (payload) => {
            const newMessage = payload.new;
            const message = JSON.parse(JSON.stringify(newMessage.content)).message as string;
            const time = newMessage.created_at.slice(11, 16) as string;
            if (isAlert) {
              clearData();
            }
            if (approve && newMessage.channel_id === myChannelId) {
              setAlertData({
                created_at: time,
                message: message,
                nickname: newMessage.nickname,
                channel_name: '내 채팅방',
                channel_id: newMessage.channel_id
              })
              setIsAlert(true);
            } else {
              const channel_data = channelList.find((channel) => channel.channel_id === newMessage.channel_id)
              if (channel_data)
                if (newMessage.user_id === user_id || newMessage.user_id === channel_data.owner_id) {
                  setAlertData({
                    created_at: time,
                    message: message,
                    nickname: newMessage.nickname,
                    channel_name: channel_data.channel_name,
                    channel_id: newMessage.channel_id
                  })
                  setIsAlert(true);
                }
            }
          }
        )
        .subscribe();
    }
  };

  const clickChat = (channel_id: number) => {
    clearData();
    const id = channel_id.toString()
    router.push(`/chatlist/[${id}]`)
  }

  const handleButton = () => {
    clearData();
  }

  useEffect(() => {
    if (userdata != undefined) {
      getChannelIdList();
    }
  }, [userdata])

  useEffect(() => {
    if (userdata != undefined) {
      receiveChatMessage();
    }
  }, [channelList])

  if (
    pathname.startsWith("/chatlist") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <div className={isAlert ? "fixed w-[200px] h-[73px] bottom-[124px] left-[16px] bg-orange-200 rounded-md" : "hidden"}>
      <button onClick={handleButton} className="absolute top-1 right-2">X</button>
      {alertData ? 
      <div onClick={()=>{
        clickChat(alertData.channel_id)
      }} className="flex flex-col m-[8px]">
        <label className="truncate text-[12px] font-medium text-[#989C9F]">{alertData?.channel_name}</label>
        <div className="flex flex-row">
          <label className="text-[18px] flex-none font-medium">{alertData.nickname}</label>
          <label className="truncate text-[16px] ml-2 font-light">{alertData.message}</label>
        </div>
        <label className="text-[12px] font-normal text-[#989C9F]">{alertData.created_at}</label>
      </div>
    : <></>}
      
    </div>
  );
}

export default AlertMessage;
