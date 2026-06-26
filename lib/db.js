const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
let supabase = null;

function initializeSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Supabase not configured. Using dummy data.');
    return null;
  }

  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✓ Supabase connected');
    return supabase;
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    return null;
  }
}

function getSupabase() {
  if (!supabase) {
    supabase = initializeSupabase();
  }
  return supabase;
}

module.exports = { initializeSupabase, getSupabase };
