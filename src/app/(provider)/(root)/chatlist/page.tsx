import Chat from "@/components/chat/Chat";
import ChatList from "@/components/chat/ChatList";
import ButtonPreview from "@/components/chat/ChatPop"

const chatlist = () => {
  return (
    <>
      <div>
        <ChatList />
      </div>
      <Chat />
    </>
  )
}

export default chatlist;