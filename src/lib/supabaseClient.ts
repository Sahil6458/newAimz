import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sbzydddcgsfzuuaotaqm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNienlkZGRjZ3NmenV1YW90YXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTUzNzksImV4cCI6MjA1NjI5MTM3OX0.oDkvz_L913u2DlfvpnKb3PkkFXg4nmythrTHox3Zm3I";

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 