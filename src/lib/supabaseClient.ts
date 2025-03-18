import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sbzydddcgsfzuuaotaqm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNienlkZGRjZ3NmenV1YW90YXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTUzNzksImV4cCI6MjA1NjI5MTM3OX0.oDkvz_L913u2DlfvpnKb3PkkFXg4nmythrTHox3Zm3I';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 