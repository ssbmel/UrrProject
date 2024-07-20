import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// export const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient<Database>(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;
