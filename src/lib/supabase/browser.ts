import { createClient } from '@supabase/supabase-js';

export function createSupabaseBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key-for-demo-builds-only',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    }
  );
}
