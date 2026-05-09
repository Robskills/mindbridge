import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Using mock mode.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : createMockSupabaseClient();

// Mock client for development without Supabase credentials
function createMockSupabaseClient() {
  const mockStorage = new Map<string, unknown>();
  
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInAnonymously: async () => ({ 
        data: { 
          user: { 
            id: 'mock-user-' + Date.now(),
            aud: 'authenticated',
          },
          session: {
            access_token: 'mock-token',
            refresh_token: 'mock-refresh',
            expires_at: Date.now() + 3600000,
          }
        }, 
        error: null 
      }),
      onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
        callback('SIGNED_IN', null);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
      }),
      insert: () => ({ select: () => ({ data: [], error: null }) }),
      update: () => ({ eq: () => ({ data: [], error: null }) }),
      delete: () => ({ eq: () => ({ data: [], error: null }) }),
    }),
    channel: () => ({
      on: () => ({ subscribe: () => ({ status: 'ok', unsubscribe: () => {} }) }),
      unsubscribe: () => {},
    }),
  } as any;
}

export type SupabaseClient = typeof supabase;
