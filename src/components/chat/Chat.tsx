"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Chat() {
  const userdata = useUserData().data;
  const supabase = createClient();
  const params = useSearchParams();
  const channel_id = Number(params.get('list'));

  const scrollRef = useRef<HTMLDivElement>(null);

  //const [content, setContent] = useState<{ message : string } | null>(null)
  const [message, setMessage] = useState<string | number | readonly string[] | undefined>('');
  const [preMessages, setPreMessages] = useState<{ message_id:number; nickname: string | null; isMine: boolean, time: string, content: { message: string | null } }[]>([]);
  const [firstLoading, setFirstLoading] = useState<boolean>(false)
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      if (!firstLoading) {
        setFirstLoading(true)
      } else {
        scrollRef.current.style.scrollBehavior = 'smooth';
      }
    }
  }

  const createChatRoom = () => {
    //유저의 대화 시작하기
  }
  const enterChatChannel = () => {
    //유저의 대화방 입장하기
  }

  const getChatMessages = async () => {

    const user_id = await userdata.id
    const approve = await userdata.approve
    if (approve) {
      //인플
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('channel_id', channel_id)
      if (error) console.log(error);
      else {
        const preMessageDataList = data?.map((message) => {
          return { message_id:message.message_id, nickname: message.nickname, isMine: (message.user_id == user_id) ? true : false, time: message.created_at, content: JSON.parse(JSON.stringify(message.content)) }
        })
        if (preMessageDataList != undefined) setPreMessages(preMessageDataList);
      }
    } else {
      //팬
      const influ_id = await checkChannelOwner();
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .in('user_id', [user_id, influ_id])
        .eq('channel_id', channel_id)
      if (error) console.log(error);
      else {
        const preMessageDataList = data?.map((message) => {
          return { message_id:message.message_id, nickname: message.nickname, isMine: (message.user_id == user_id) ? true : false, time: message.created_at, content: JSON.parse(JSON.stringify(message.content)) }
        })
        if (preMessageDataList != undefined) setPreMessages(preMessageDataList);
      }
    }
  }

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

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        channel_id: channel_id,
        content: JSON.parse(content),
        user_id: user_id,
        nickname: nickname
      })
    if (error) {
      console.log('채팅 보내기 실패')
      console.log(error)
    }
  }

  const checkChannelOwner = async (): Promise<String | null> => {
    const { data, error } = await supabase
      .from('chat_channels')
      .select('owner_id')
      .eq('channel_id', channel_id)
      .single()
    if (error) {
      console.log(error);
      return null;
    }
    else {
      return data.owner_id;
    }
  }

  const receiveChatMessage = async () => {
    const user_id = await userdata.id
    const approve = await userdata.approve
    const owner_id = await checkChannelOwner();
    if (approve && owner_id == user_id) {
      console.log('인플루언서 본인의 채팅방입니다.')
      const channelInflu = supabase
        .channel('changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `channel_id=eq.${channel_id}`,
          },
          (payload) => {
            const newMessage = payload.new;
            setPreMessages((pre) => {
              return [...pre, { message_id:newMessage.message_id, nickname: newMessage.nickname, isMine: (newMessage.user_id == user_id) ? true : false, time: newMessage.created_at, content: newMessage.content }]
            })
          }

        )
        .subscribe()
    } else {
      console.log('팬 채팅방입니다.')
      const channelFan = supabase
        .channel('changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `channel_id=eq.${channel_id}`,
          },
          (payload) => {
            const newMessage = payload.new;
            if (newMessage.user_id == user_id || newMessage.user_id == owner_id) {
              setPreMessages((pre) => {
                return [...pre, { message_id:newMessage.message_id, nickname: newMessage.nickname, isMine: (newMessage.user_id == user_id) ? true : false, time: newMessage.created_at, content: newMessage.content }]
              })
            }
          }
        )
        .subscribe()
    }

  }

  useEffect(() => {
    if (userdata != undefined) {
      getChatMessages();
      receiveChatMessage();
    }
  }, [userdata])

  useEffect(() => {
    scrollToBottom();
  }, [preMessages])

  return (
    <div className="relative overflow-y-hidden">
      <div key={channel_id} ref={scrollRef} className="relative h-full overflow-y-auto max-h-56">
        {preMessages?.map((preMessage) => (
          (preMessage.isMine) ?
            <div key={preMessage.message_id} className="text-right">
              <label className="text-xs text-inherit">{preMessage.time.slice(11, 16)}</label>
              <label className="">{preMessage.content.message}</label>
            </div>
            :
            <div key={preMessage.message_id}>
              <div>
                <label className="">{preMessage.nickname}</label>
              </div>
              <div className="text-left">
                <label className="">{preMessage.content.message}</label>
                <label className="text-xs text-inherit">{preMessage.time.slice(11, 16)}</label>
              </div>
            </div>


        ))}
      </div>

      <div className="w-full h-full bottom-0 shrink-0 mt-0.5 mb-0">
        <textarea className="h-[80px] w-full border border-black" value={message} onChange={handleTextarea}></textarea>
        <button className="border border-black bottom-0 mb-0" onClick={(message != '') ? () => {
          sendChatMessage();
          setMessage('');
        } : () => {
          console.log('보낼 내용 없음')
        }}>채팅 보내기</button>
      </div>
    </div>
  );
}
