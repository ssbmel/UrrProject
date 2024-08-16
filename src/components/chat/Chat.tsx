"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import poly from "../../../public/images/chatpoly.png";
import PlusIcon from "../../../public/icon/pluscontent.svg";
import SendIcon from "../../../public/icon/sendmessage.svg";

interface detailProps {
  params: { id: string };
}

export default function Chat({ params }: detailProps) {
  const userdata = useUserData().data;
  const supabase = createClient();
  const channel_id = Number(params.id.slice(3, -3));

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPreRef = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const textareadiv = useRef<HTMLDivElement>(null);

  //const [content, setContent] = useState<{ message : string } | null>(null)
  const [message, setMessage] = useState<string | number | readonly string[] | undefined>("");
  const [preMessages, setPreMessages] = useState<
    {
      message_id: number;
      nickname: string | null;
      isMine: boolean;
      time: string;
      content: { message: string | null };
    }[]
  >([]);
  const [newMessages, setNewMessages] = useState<
    {
      message_id: number;
      nickname: string | null;
      isMine: boolean;
      time: string;
      content: { message: string | null };
    }[]
  >([]);
  const [receiveMessages, setReceiveMessages] = useState<
    {
      message_id: number;
      nickname: string | null;
      isMine: boolean;
      time: string;
      content: { message: string | null };
    }[]
  >([]);
  const [firstLoading, setFirstLoading] = useState<boolean>(false);

  const handleResizeHeight = () => {
    if (textarea.current && textareadiv.current) {
      if (textarea.current.scrollHeight >= 40 && textarea.current.scrollHeight <= 112) {
        textarea.current.style.height = textarea.current.scrollHeight + "px";
        textareadiv.current.style.height = textarea.current.scrollHeight + "px";
      }
    }
  };

  const resizeHeight = () => {
    if (textarea.current && textareadiv.current) {
      textarea.current.style.height = "40px";
      textareadiv.current.style.height = "40px";
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current && scrollPreRef.current) {
      if (!firstLoading) {
        scrollRef.current.scrollTop = scrollPreRef.current.scrollHeight - 310;
      } else {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        scrollRef.current.style.scrollBehavior = "smooth";
      }
    }
  };

  const getPreChatMessages = async () => {
    const user_id = await userdata.id;
    const approve = await userdata.approve;
    const influ_id = await checkChannelOwner();
    if (influ_id === user_id) {
      //채널주
      const last_time = await checkMyChannelLastTime();
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("channel_id", channel_id)
        .order('created_at', { ascending: true })
        .lt('created_at', last_time);
      if (error) console.log(error);
      else {
        const preMessageDataList = data?.map((message) => {
          return {
            message_id: message.message_id,
            nickname: message.nickname,
            isMine: message.user_id == user_id ? true : false,
            time: message.created_at,
            content: JSON.parse(JSON.stringify(message.content))
          };
        });
        if (preMessageDataList != undefined) setPreMessages(preMessageDataList);
      }
    } else {
      //팬
      const last_time = await checkMySubLastTime()
      const created_at_time = await checkMySubCreatedAtTime();
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .in("user_id", [user_id, influ_id])
        .eq("channel_id", channel_id)
        .order('created_at', { ascending: true })
        .gt('created_at', created_at_time)
        .lt('created_at', last_time);
      if (error) console.log(error);
      else {
        const preMessageDataList = data?.map((message) => {
          return {
            message_id: message.message_id,
            nickname: message.nickname,
            isMine: message.user_id == user_id ? true : false,
            time: message.created_at,
            content: JSON.parse(JSON.stringify(message.content))
          };
        });
        if (preMessageDataList != undefined) setPreMessages(preMessageDataList);
      }
    }
  };

  const getNewChatMessages = async () => {
    const user_id = await userdata.id;
    const approve = await userdata.approve;
    const influ_id = await checkChannelOwner();
    if (influ_id === user_id) {
      //채널주
      const last_time = await checkMyChannelLastTime();
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("channel_id", channel_id)
        .order('created_at', { ascending: true })
        .gt('created_at', last_time);
      if (error) console.log(error);
      else {
        const newMessageDataList = data?.map((message) => {
          return {
            message_id: message.message_id,
            nickname: message.nickname,
            isMine: message.user_id == user_id ? true : false,
            time: message.created_at,
            content: JSON.parse(JSON.stringify(message.content))
          };
        });
        if (newMessageDataList != undefined) setNewMessages(newMessageDataList);
      }
      updateMyChannelLastTime();
    } else {
      //팬
      const last_time = await checkMySubLastTime()
      const created_at_time = await checkMySubCreatedAtTime();
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .in("user_id", [user_id, influ_id])
        .eq("channel_id", channel_id)
        .order('created_at', { ascending: true })
        .gt('created_at', last_time);
      if (error) console.log(error);
      else {
        const newMessageDataList = data?.map((message) => {
          return {
            message_id: message.message_id,
            nickname: message.nickname,
            isMine: message.user_id == user_id ? true : false,
            time: message.created_at,
            content: JSON.parse(JSON.stringify(message.content))
          };
        });
        if (newMessageDataList != undefined) setNewMessages(newMessageDataList);
      }
      updateMySubLastTime();
    }
    setFirstLoading(false);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const sendChatMessage = async () => {
    const user_id = await userdata.id;
    const nickname = await userdata.nickname;
    //유저가 해당 채팅방을 구독하고 있는지 확인하는 함수 필요
    const content = JSON.stringify({
      message: message
    });

    const { data, error } = await supabase.from("chat_messages").insert({
      channel_id: channel_id,
      content: JSON.parse(content),
      user_id: user_id,
      nickname: nickname
    });
    if (error) {
      console.log("채팅 보내기 실패"); //alert로 바꿀 것
      console.log(error);
    }
    resizeHeight();
  };

  const checkChannelOwner = async (): Promise<String | null> => {
    const { data, error } = await supabase
      .from("chat_channels")
      .select("owner_id")
      .eq("channel_id", channel_id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return data.owner_id;
    }
  };

  const checkMySubCreatedAtTime = async (): Promise<String | null> => {
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

  const checkMySubLastTime = async (): Promise<String | null> => {
    const user_id = await userdata.id;
    const { data, error } = await supabase
      .from("chat_subscribe")
      .select("last_time")
      .eq("channel_id", channel_id)
      .eq("user_id", user_id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return data.last_time;
    }
  };

  const checkMyChannelLastTime = async (): Promise<String | null> => {
    const { data, error } = await supabase
      .from("chat_channels")
      .select("last_time")
      .eq("channel_id", channel_id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return data.last_time;
    }
  };

  const updateMySubLastTime = async () => {
    const user_id = await userdata.id;
    const { data, error } = await supabase
      .from("chat_subscribe")
      .update({ "update_data": "" })
      .eq("channel_id", channel_id)
      .eq("user_id", user_id);
    if (error)
      console.log(error);
  };

  const updateMyChannelLastTime = async () => {
    const { data, error } = await supabase
      .from("chat_channels")
      .update({ "update_data": "" })
      .eq("channel_id", channel_id)
    if (error)
      console.log(error);
  };

  const receiveChatMessage = async () => {
    const user_id = await userdata.id;
    const owner_id = await checkChannelOwner();
    if (owner_id == user_id) {
      //채널주
      const channelInflu = supabase
        .channel("changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `channel_id=eq.${channel_id}`
          },
          (payload) => {
            setFirstLoading(true);
            const newMessage = payload.new;
            updateMyChannelLastTime();
            setReceiveMessages((pre) => {
              return [
                ...pre,
                {
                  message_id: newMessage.message_id,
                  nickname: newMessage.nickname,
                  isMine: newMessage.user_id == user_id ? true : false,
                  time: newMessage.created_at,
                  content: newMessage.content
                }
              ];
            });
          }
        )
        .subscribe();
    } else {
      //팬
      const channelFan = supabase
        .channel("changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `channel_id=eq.${channel_id}`
          },
          (payload) => {
            setFirstLoading(true);
            const newMessage = payload.new;
            if (newMessage.user_id == user_id || newMessage.user_id == owner_id) {
              updateMySubLastTime();
              setReceiveMessages((pre) => {
                return [
                  ...pre,
                  {
                    message_id: newMessage.message_id,
                    nickname: newMessage.nickname,
                    isMine: newMessage.user_id == user_id ? true : false,
                    time: newMessage.created_at,
                    content: newMessage.content
                  }
                ];
              });
            }
          }
        )
        .subscribe();
    }
  };

  useEffect(() => {
    if (userdata != undefined && channel_id != null) {
      getPreChatMessages();
      getNewChatMessages();
      receiveChatMessage();
    }
  }, [userdata]);

  useEffect(() => {
    scrollToBottom();
  }, [newMessages, receiveMessages]);


  const pressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) { 	   // isComposing 이 true 이면 
      return;				   // 조합 중이므로 동작을 막는다.
    }

    if (e.key === "Enter" && !e.shiftKey) {
      // [Enter] 치면 메시지 보내기
      if (message !== "") {
        sendChatMessage();
        setMessage("");
      } else {
        e.preventDefault();
        return;
      }
      e.preventDefault();
    }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col xl:w-[375px] xl:mx-auto">
      <div key={channel_id} ref={scrollRef} className="relative overflow-y-scroll bg-[#E1EEFE] grow">
        <div ref={scrollPreRef}>
          {preMessages?.map((preMessage) =>
            preMessage.isMine ? (
              <div key={preMessage.message_id} className="p-2">
                <div className="flex flex-row-reverse">
                  <Image
                    src={poly}
                    width={12.87}
                    height={8}
                    quality={100}
                    className="absolute mr-1 z-10 mt-[8px] -scale-x-100"
                    alt="chatpoly"
                  ></Image>
                  <label className="z-0 chat text-[16px] font-light bg-white border-[1.5px] border-solid border-primaryheavy rounded p-2 mr-[15px] mb-2 max-w-[246px]">
                    {preMessage.content.message}
                  </label>
                  <label className="text-[12px] font-normal mb-2 mt-auto mr-[4px] text-[#989C9F]">
                    {preMessage.time.slice(11, 16)}
                  </label>
                </div>
              </div>
            ) : (
              <div key={preMessage.message_id} className="p-2">
                <div className="ml-3 mb-1">
                  <label className="font-normal">{preMessage.nickname}</label>
                </div>
                <div className="flex flex-row">
                  <Image
                    src={poly}
                    width={12.87}
                    height={8}
                    quality={100}
                    className="absolute z-10 mt-[8px] ml-1"
                    alt="chatpoly"
                  ></Image>
                  <label className="z-0 chat text-[16px] font-light bg-white border-[1.5px] border-solid border-primaryheavy rounded p-2 ml-[14.9px] mb-2 max-w-[246px]">
                    {preMessage.content.message}
                  </label>
                  <label className="text-[12px] font-normal mb-2 mt-auto ml-[4px] text-[#989C9F]">
                    {preMessage.time.slice(11, 16)}
                  </label>
                </div>
              </div>
            )
          )}
        </div>
        {newMessages.length !== 0 ?
          <div className="flex flex-row w-full h-[40px] items-center my-[30px]">
            <div className="h-[2px] ml-[15px] w-full bg-[#B2B5B8]"></div>
            <div className="mx-[10px] text-[#989C9F] flex-none w-[150px] h-[24px] font-normal text-[16px] text-center">여기까지 읽었습니다</div>
            <div className="h-[2px] mr-[15px] w-full bg-[#B2B5B8]"></div>
          </div>
          : <></>}

        {newMessages?.map((newMessage) =>
          newMessage.isMine ? (
            <div key={newMessage.message_id} className="p-2">
              <div className="flex flex-row-reverse">
                <Image
                  src={poly}
                  width={12.87}
                  height={8}
                  quality={100}
                  className="absolute mr-1 z-10 mt-[8px] -scale-x-100"
                  alt="chatpoly"
                ></Image>
                <label className="z-0 chat text-[16px] font-light bg-white border-[1.5px] border-solid border-primaryheavy rounded p-2 mr-[15px] mb-2 max-w-[246px]">
                  {newMessage.content.message}
                </label>
                <label className="text-[12px] font-normal mb-2 mt-auto mr-[4px] text-[#989C9F]">
                  {newMessage.time.slice(11, 16)}
                </label>
              </div>
            </div>
          ) : (
            <div key={newMessage.message_id} className="p-2">
              <div className="ml-3 mb-1">
                <label className="font-normal">{newMessage.nickname}</label>
              </div>
              <div className="flex flex-row">
                <Image
                  src={poly}
                  width={12.87}
                  height={8}
                  quality={100}
                  className="absolute z-10 mt-[8px] ml-1"
                  alt="chatpoly"
                ></Image>
                <label className="z-0 chat text-[16px] font-light bg-white border-[1.5px] border-solid border-primaryheavy rounded p-2 ml-[14.9px] mb-2 max-w-[246px]">
                  {newMessage.content.message}
                </label>
                <label className="text-[12px] font-normal mb-2 mt-auto ml-[4px] text-[#989C9F]">
                  {newMessage.time.slice(11, 16)}
                </label>
              </div>
            </div>
          )
        )}

        {receiveMessages?.map((newMessage) =>
          newMessage.isMine ? (
            <div key={newMessage.message_id} className="p-2">
              <div className="flex flex-row-reverse">
                <Image
                  src={poly}
                  width={12.87}
                  height={8}
                  quality={100}
                  className="absolute mr-1 z-10 mt-[8px] -scale-x-100"
                  alt="chatpoly"
                ></Image>
                <label className="z-0 chat text-[16px] font-light bg-white border-[1.5px] border-solid border-primaryheavy rounded p-2 mr-[15px] mb-2 max-w-[246px]">
                  {newMessage.content.message}
                </label>
                <label className="text-[12px] font-normal mb-2 mt-auto mr-[4px] text-[#989C9F]">
                  {newMessage.time.slice(11, 16)}
                </label>
              </div>
            </div>
          ) : (
            <div key={newMessage.message_id} className="p-2">
              <div className="ml-3 mb-1">
                <label className="font-normal">{newMessage.nickname}</label>
              </div>
              <div className="flex flex-row">
                <Image
                  src={poly}
                  width={12.87}
                  height={8}
                  quality={100}
                  className="absolute z-10 mt-[8px] ml-1"
                  alt="chatpoly"
                ></Image>
                <label className="z-0 chat text-[16px] font-light bg-white border-[1.5px] border-solid border-primaryheavy rounded p-2 ml-[14.9px] mb-2 max-w-[246px]">
                  {newMessage.content.message}
                </label>
                <label className="text-[12px] font-normal mb-2 mt-auto ml-[4px] text-[#989C9F]">
                  {newMessage.time.slice(11, 16)}
                </label>
              </div>
            </div>
          )
        )}

      </div>
        <div ref={textareadiv} className="flex flex-row w-full h-[40px] bottom-0 shrink-0 mt-2 mb-6 px-4">

          <textarea
            onKeyDown={pressEnter}
            className="flex-1 overflow-auto focus:outline-none rounded-[6px] text-[16px] font-medium py-2 px-3 h-[40px] w-auto border border-[#EAECEC]"
            value={message}
            onChange={handleTextarea}
            ref={textarea}
            onInput={handleResizeHeight}
          ></textarea>
          <SendIcon
            onClick={
              message != ""
                ? () => {
                  sendChatMessage();
                  setMessage("");
                }
                : () => {

                }
            }
          ></SendIcon>
        </div>
      </div>

  );
}
