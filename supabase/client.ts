import { Database } from '../types/supabase';
import { createBrowserClient } from '@supabase/ssr';

// const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// const supabase = createClient<Database>(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
