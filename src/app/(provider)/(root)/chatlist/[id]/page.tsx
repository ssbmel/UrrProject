"use client";

import Chat from "@/components/chat/Chat";

type ParamsType = { id: string };

const ChatPage = ({ params }: { params: ParamsType }) => {
  return (
    <div className="absolute">
      <Chat params={params} />
    </div>
  );
};

export default ChatPage;
