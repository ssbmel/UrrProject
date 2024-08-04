
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/chat/Chat'), {ssr: false})
const ChatPage = () => {
  return (
    <>
      <Chat/>
    </>
  )
}

export default ChatPage;