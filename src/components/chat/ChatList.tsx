"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAlertchatStore } from "@/zustand/alertchatStore";
import Link from "next/link";

export default function ChatList() {
  const userdata = useUserData().data;
  const supabase = createClient();
  const router = useRouter();

  const [chatListData, setChatListData] = useState<
    (
      | {
        channel_id: number;
        channel_name: string | null;
        owner_id: string;
        owner_profile_url: string | null;
        created_at: string;
        message: string | null;
        countMessages: number;
      }
      | undefined
    )[]
  >([]);
  const [myChannel, setMyChannel] = useState<{
    channel_id: number;
    channel_name: string | null;
    owner_id: string;
    owner_profile_url: string | null;
    created_at: string;
    message: string | null;
    countMessages: number;
  } | null>(null);
  const [myChannelIdList, setMyChannelIdList] = useState<number[]>([]);
  const { setIsChatModalOpen, setIsAlert } = useAlertchatStore();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(/Mobi/i.test(window.navigator.userAgent));
  }, [])


  const getMyChannel = async () => {
    //나의 채팅 채널 불러오기
    const user_id = userdata.id;
    const { data, error } = await supabase.from("chat_channels").select("*").eq("owner_id", user_id).single();
    if (data) {
      const countMessages = await countUnreadMessages(data.last_time, data.channel_id, data.owner_id);
      const response = await getlastMessage(data.channel_id, data.owner_id);
      if (response?.time != undefined && response?.message != undefined) {
        const channel_data = {
          channel_id: data.channel_id,
          channel_name: data.channel_name,
          owner_id: data.owner_id,
          owner_profile_url: data.owner_profile_url,
          created_at: response?.time,
          message: response?.message,
          countMessages
        };
        setMyChannel(channel_data);
        setMyChannelIdList((pre) => {
          return [...pre, data.channel_id];
        });
      }
    }
  };

  const countUnreadMessages = async (last_time: string, channel_id: number, owner_id: string): Promise<number> => {
    const user_id = await userdata.id;
    if (owner_id === user_id) {
      //채널주
      const { count, error } = await supabase
        .from("chat_messages")
        .select("*", { count: "exact", head: true })
        .eq("channel_id", channel_id)
        .gt("created_at", last_time);

      if (error) {
        console.log(error);
        return 0;
      }
      if (!count) {
        return 0;
      } else {
        return count;
      }
    } else {
      //팬
      const { data, count, error } = await supabase
        .from("chat_messages")
        .select("*", { count: "exact", head: true })
        .eq("channel_id", channel_id)
        .in("user_id", [user_id, owner_id])
        .gt("created_at", last_time);
      if (error) {
        console.log(error);
        return 0;
      }
      if (!count) {
        return 0;
      } else {
        return count;
      }
    }
  };

  const getChatList = async () => {
    //유저의 대화구독목록 불러오기
    const user_id = userdata.id;
    const approve = userdata.approve;
    if (approve) {
      await getMyChannel();
    }
    const { data, error } = await supabase
      .from("chat_subscribe")
      .select(
        `
        created_at,
        channel_id,
        last_time,
        chat_channels(
          *
        )
        `
      )
      .eq("user_id", user_id)
      .order("last_time", { ascending: false });

    if (data) {
      const channelListDatas = await Promise.all(
        data.map(async (subscribe) => {
          if (subscribe.chat_channels) {
            const countMessages = await countUnreadMessages(
              subscribe.last_time,
              subscribe.channel_id,
              subscribe.chat_channels.owner_id
            );
            const response = await getlastMessage(subscribe.channel_id, subscribe.chat_channels.owner_id);
            if (response?.time != undefined && response.message != undefined) {
              setMyChannelIdList((pre) => {
                return [...pre, subscribe.channel_id];
              });
              return {
                channel_id: subscribe.channel_id,
                channel_name: subscribe.chat_channels.channel_name,
                owner_id: subscribe.chat_channels.owner_id,
                owner_profile_url: subscribe.chat_channels.owner_profile_url,
                created_at: response.time,
                message: response.message,
                countMessages
              };
            }
          }
        })
      );
      setChatListData(channelListDatas);
    }
  };

  const getlastMessage = async (
    channel_id: number,
    owner_id: string
  ): Promise<{ time: string; message: string } | null> => {
    //유저의 마지막 대화 불러오기
    const user_id = await userdata.id;
    if (owner_id === user_id) {
      //채널주
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("channel_id", channel_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!data) {
        return { time: "", message: "대화를 시작해보세요" };
      } else {
        const message = JSON.parse(JSON.stringify(data.content)).message as string;
        const time = data.created_at.slice(11, 16) as string;
        return { time, message };
      }
    } else {
      //팬
      const created_at_time = await checkMySubCreatedAtTime(channel_id);
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("channel_id", channel_id)
        .in("user_id", [user_id, owner_id])
        .order("created_at", { ascending: false })
        .gt("created_at", created_at_time)
        .limit(1)
        .maybeSingle();
      if (!data) {
        return { time: "", message: "대화를 시작해보세요" };
      } else {
        const message = JSON.parse(JSON.stringify(data.content)).message as string;
        const time = data.created_at.slice(11, 16) as string;
        return { time, message };
      }
    }
  };

  const checkMySubCreatedAtTime = async (channel_id: number): Promise<String | null> => {
    const user_id = await userdata.id;
    const { data, error } = await supabase
      .from("chat_subscribe")
      .select("created_at")
      .eq("channel_id", channel_id)
      .eq("user_id", user_id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return data.created_at;
    }
  };

  //실시간
  const receiveChatMessage = async () => {
    const user_id = await userdata.id;
    const channels = supabase
      .channel("changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `channel_id=in.(${myChannelIdList})`
        },
        (payload) => {
          const newMessage = payload.new;
          const message = JSON.parse(JSON.stringify(newMessage.content)).message as string;
          const time = newMessage.created_at.slice(11, 16) as string;
          if (myChannel && newMessage.channel_id === myChannel.channel_id) {
            setMyChannel({
              ...myChannel,
              created_at: time,
              message: message,
              countMessages: ++myChannel.countMessages
            });
          } else {
            if (chatListData) {
              setChatListData(
                chatListData?.map((pre) => {
                  if (pre) {
                    if (
                      pre?.channel_id === newMessage.channel_id &&
                      (newMessage.user_id === user_id || newMessage.user_id === pre?.owner_id)
                    ) {
                      return {
                        ...pre,
                        created_at: time,
                        message: message,
                        countMessages: ++pre.countMessages
                      };
                    } else {
                      return pre;
                    }
                  }
                })
              );
            }
          }
        }
      )
      .subscribe();
  };

  const clickChat = (channel_id: number) => {
    const id = channel_id.toString();
    router.push(`/chatlist/[${id}]`);
  };

  const [innerWidth, setInnerWidth] = useState<number>(0);
  const resizeListener = () => {
    setInnerWidth(window.innerWidth);
  };
  // 초기값 설정
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정
  const openWindow = (channel_id: number, channel_name: string | null) => {
    const id = channel_id.toString();
    setIsChatModalOpen(false);
    window.open(`/chatlist/[${id}]`, "_blank", "popup=yes,width=408,height=812");
  };

  useEffect(() => {
    setIsAlert(false);
    if (userdata != undefined) {
      getChatList();
    }
  }, [userdata]);

  useEffect(() => {
    if (userdata != undefined) {
      receiveChatMessage();
    }
  }, [myChannelIdList]);

  return (
    <div className="mt-[6px] flex flex-col xl:mx-2 xl:my-3">
      {myChannel != undefined ? (
        <div className="">
          <p className="w-[343px] xl:w-[285px] mx-auto font-bold text-[20px] xl:px-3 mb-[12px]">나의 채팅방</p>
          <div className="w-[343px] xl:w-[285px] mx-auto flex flex-col justify-center">
            <div
              onClick={
                innerWidth < 1280
                  ? () => clickChat(myChannel.channel_id)
                  : () => openWindow(myChannel.channel_id, myChannel.channel_name)
              }
            >
              <div
                key={myChannel.channel_id}
                className={
                  myChannel != null
                    ? "w-[343px] xl:w-[285px] xl:px-3 xl:py-2 h-[73px] relative flex flex-row items-center"
                    : "hidden"
                }
              >
                <div className="relative flex-none w-[68px] h-[68px] xl:w-[60px] xl:y-[60px]">
                  {myChannel.owner_profile_url && (
                    <Image
                      fill
                      priority={true}
                      src={myChannel.owner_profile_url}
                      alt="owner profile"
                      className="object-cover rounded-[6px]"
                    />
                  )}
                </div>
                <div className="w-[255px] xl:w-[193px] flex flex-col ml-[8px] mr-[12px] xl:mr-0">
                  <div className="flex flex-row items-center h-[27px]">
                    <label className="truncate text-[18px] font-medium">{myChannel.channel_name}</label>
                    <label
                      className={
                        myChannel.countMessages > 0
                          ? "ml-[7px] rounded-[14px] text-white w-[36px] h-[20px] bg-gradient-to-br from-[#0068e5] to-[#9aec5b] text-center text-[14px] font-medium"
                          : "hidden"
                      }
                    >
                      {myChannel.countMessages < 100 ? `${myChannel.countMessages}` : `99+`}
                    </label>
                  </div>
                  <label className="truncate text-[16px] font-light">{myChannel.message}</label>
                  <label className="text-[12px] font-normal text-[#989C9F]">{myChannel?.created_at}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20px] h-2 w-auto bg-[#F4F4F4]" />
          <p className="w-[343px] xl:w-[285px] mx-auto font-bold text-[20px] xl:px-3 mt-[20px] mb-[-2px]">
            내가 참여한 채팅방
          </p>
        </div>
      ) : (
        <></>
      )}

      {(myChannel == null && chatListData.length == 0) &&
        <div className={isMobile ? "h-[calc(100vh-180px)] flex justify-center items-center text-[#989C9F]" : "h-[345px] text-[#989C9F] flex justify-center items-center"}>
          <label className="">인플루언서와 채팅을 시작해 보세요!</label>
        </div>
      }

      {(myChannel !== null && chatListData.length == 0) &&
        <div className={isMobile ? "h-[calc(100vh-371px)] flex justify-center items-center text-[#989C9F]" : "h-[154px] text-[#989C9F] flex justify-center items-center"}>
          <label className="">인플루언서와 채팅을 시작해 보세요!</label>
        </div>
      }

      <div className="w-[343px] xl:w-[285px] mx-auto flex flex-col divide-y-2 divide-[#F4F4F4] justify-center">
        {chatListData != undefined ? (
          chatListData.map((channel) => (
            <div key={channel?.channel_id} className="">
              {channel != undefined ? (
                <div
                  onClick={
                    innerWidth < 1280
                      ? () => clickChat(channel.channel_id)
                      : () => openWindow(channel.channel_id, channel.channel_name)
                  }
                >
                  <div className="w-[343px] xl:w-[285px] h-[73px] my-[18px] xl:px-3 xl:py-2 xl:my-2 relative flex flex-row items-center">
                    <div className="relative flex-none w-[68px] h-[68px] xl:w-[60px] xl:y-[60px]">
                      {channel?.owner_profile_url && (
                        <Image
                          fill
                          priority={true}
                          src={channel.owner_profile_url}
                          alt="owner profile"
                          className="object-cover rounded-[6px]"
                        />
                      )}
                    </div>
                    <div className="w-[255px] xl:w-[193px] flex flex-col ml-[8px] mr-[12px]">
                      <div className="flex flex-row items-center h-[27px]">
                        <label className="truncate text-[18px] font-medium">{channel.channel_name}</label>
                        <label
                          className={
                            channel.countMessages > 0
                              ? "ml-[7px] rounded-[14px] text-white w-[36px] h-[20px] bg-[#FF5E5E] text-center text-[14px] font-medium"
                              : "hidden"
                          }
                        >
                          {channel.countMessages < 100 ? `${channel.countMessages}` : `99+`}
                        </label>
                      </div>
                      <label className="truncate text-[16px] font-light">{channel.message}</label>
                      <label className="text-[12px] font-normal text-[#989C9F]">{channel?.created_at}</label>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
