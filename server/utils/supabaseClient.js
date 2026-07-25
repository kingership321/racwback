const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
let supabaseAdmin = null;

// Only initialize Supabase if credentials are provided
if (supabaseUrl && supabaseAnonKey) {
  // Public client (for auth)
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Admin client (bypass RLS)
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
  
  console.log('✅ Supabase client initialized');
} else {
  console.warn('⚠️ Supabase credentials not found in environment variables.');
  console.warn('   Set SUPABASE_URL and SUPABASE_ANON_KEY in .env to enable Supabase features.');
}

module.exports = { supabase, supabaseAdmin };