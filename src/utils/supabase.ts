import { createClient } from '@supabase/supabase-js';

export type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface Database {
  public: {
    Tables: {
      guestbook_messages: {
        Row: GuestbookMessage;
        Insert: {
          name: string;
          message: string;
        };
        Update: {
          id?: string;
          name?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase =
  supabaseUrl && supabasePublishableKey
    ? createClient<Database>(supabaseUrl, supabasePublishableKey)
    : null;
