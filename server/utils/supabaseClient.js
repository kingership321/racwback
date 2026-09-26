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
}

let isSupabaseAvailable = true;
let lastFailureTime = 0;
const SUPABASE_RETRY_INTERVAL_MS = 60 * 1000; // Retry every 60s if offline

function canQuerySupabase() {
  if (!supabaseAdmin) return false;
  if (!isSupabaseAvailable) {
    if (Date.now() - lastFailureTime > SUPABASE_RETRY_INTERVAL_MS) {
      isSupabaseAvailable = true;
      return true;
    }
    return false;
  }
  return true;
}

function markSupabaseDown(error) {
  isSupabaseAvailable = false;
  lastFailureTime = Date.now();
  console.warn(`⚠️ Supabase connection unavailable (${error?.message || error}). Serving local fallback store for next 60s.`);
}

module.exports = {
  supabase,
  supabaseAdmin,
  canQuerySupabase,
  markSupabaseDown
};