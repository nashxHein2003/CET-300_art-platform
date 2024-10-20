import { createClient } from '@supabase/supabase-js';

// Ensure the environment variables are loaded correctly
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

export const supabaseCoverImageUrl = `https://${supabaseUrl.split('//')[1]}/storage/v1/object/public`;
export const supabaseProfileImageUrl = `https://${supabaseUrl.split('//')[1]}/storage/v1/object/public`;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
