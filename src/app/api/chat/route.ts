import { useParams } from 'next/navigation';
import { createClient } from '../../../../supabase/client';
import { ChatSubscribe } from '../../../../types/common';
import { useUserData } from '@/hooks/useUserData';

const supabase = createClient();
//팬 유저의 채팅 불러오기
export async function GET() {
  try {
    const channel_id = '1';
    const user_id = useUserData().data.id;
    console.log(user_id)
    const { data, error } = await supabase
      .from('chat_channels')
      .select('owner_id')
      .eq('channel_id', channel_id)
      .single()

    const owner_id = data?.owner_id;
    console.log(owner_id);
    if (error) {
      console.log(error)
    } else {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .in('user_id', [user_id, owner_id])
        .eq('channel_id', channel_id)

      if (error) {
        console.log(error)
        return Response.json({ errorMsg: error.message }, { status: 400 });
      } else {
        console.log(data)
      }
    }
  } catch (error) {
    return Response.json({ }, { status: 400 });
  }
  return Response.json({  }, { status: 200 });
}
