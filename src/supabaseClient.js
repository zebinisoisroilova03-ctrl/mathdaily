import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,        // session'ni localStorage'da saqlaydi
    autoRefreshToken: true,      // token muddati tugasa avtomat yangilaydi
    detectSessionInUrl: true,    // Google OAuth redirect'dan session'ni o'qiydi
    storage: window.localStorage, // saqlash joyi — localStorage
  },
})