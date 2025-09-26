import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv'

// Load .env or .env.local
dotenv.config({ path: '.env.local' }) 
dotenv.config() // fallback to .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

// Test connection
export async function testConnection() {
  try {
    const { data, error } = await supabase.from('workspaces').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
}