"use client";
import { useUserData } from "@/hooks/useUserData";
import { getMessages } from "@/services/chats/chats.service";

export default function Chat () {
  const { data } = useUserData();
  console.log(data);

  const createChatRoom = () => {

  }
  const enterChatChannel = () => {

  }
  const getChatMessages = async () => {
    const user_id = "b64dbaca-2997-46b6-a4b2-d9c6e6fce069"
    const channel_id = "1"
    await getMessages();
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
