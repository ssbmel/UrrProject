'use client'

import Chat from "@/components/chat/Chat";

type ParamsType = { id: string };

const ChatPage = ({ params }: { params: ParamsType }) => {
  return (

    <Chat params={params} />

  );
};

export default ChatPage;
