"use client";

import { useUserData } from "@/hooks/useUserData";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";
import ChatStart from "../../../public/icon/chatstart.svg";

interface setDataType {
  owner_id: string;
}

export default function StartChat(props: setDataType) {
  const userdata = useUserData().data;
  const supabase = createClient();
  const router = useRouter();
  const owner_id = props.owner_id;
  const isMobile = /Mobi/i.test(window.navigator.userAgent);

  const checkOwnerChannel = async (): Promise<number | null> => {
    const { data, error } = await supabase
      .from("chat_channels")
      .select("channel_id")
      .eq("owner_id", owner_id)
      .maybeSingle();
    if (error) {
      console.log(error);
      return null;
    }
    if (!data) {
      console.log("채널이 존재하지 않습니다.");
      return null;
    } else {
      return data.channel_id;
    }
  };

  const startChat = async () => {
    //유저의 대화구독목록 불러오기
    const user_id = userdata.id;
    const channel_id = await checkOwnerChannel();
    if (channel_id && user_id != undefined) {
      const { data, error } = await supabase
        .from("chat_subscribe")
        .select("chat_subscribe_id")
        .eq("channel_id", channel_id)
        .eq("user_id", user_id)
        .maybeSingle();
      if (!data) {
        createNewSubscribe(channel_id, user_id);
      }
    }
    if (isMobile) {
      router.push(`/chatlist/[${channel_id}]`);
    } else {
      window.open(`/chatlist/[${channel_id}]`, "_blank", "popup=yes,width=408,height=812");
    }

  };

  const createNewSubscribe = async (channel_id: number, user_id: string) => {
    const { data, error } = await supabase.from("chat_subscribe").insert({
      channel_id: channel_id,
      user_id: user_id
    });
    if (error) console.log(error);
  };

  return (
    <div>
      {userdata !== undefined ? (
        <button
          className="flex cursor-pointer items-center gap-[4px] justify-center text-center w-[86px] h-[32px] text-[12px] text-primarystrong border-[1px] border-primarynormal rounded-[6px] transition-colors hover:bg-primarylightness"
          onClick={startChat}
        >
          <span className="font-[600]">채팅하기</span>
          <div className="">
            <ChatStart />
          </div>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
