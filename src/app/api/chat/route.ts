import { createClient } from '../../../../supabase/server';
import { ChatSubscribe } from '../../../../types/common';

const supabase = createClient();
//팬 유저의 채팅 불러오기
export async function GET(request: Request) {
  try {
    const { channel_id, user_id } = (await request.json()) as ChatSubscribe;
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user_id)
  } catch {
    
  }
    
}
