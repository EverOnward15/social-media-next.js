"use client";
require('dotenv').config();
 import { createBrowserClient } from '@supabase/ssr'

// //A way to initialize the Supabase client only once, and use it everywhere in the app as needed by importing the "supabase" module
// // Just use --> umport supabase at the top where you want to use Supabse functionality
   const supabase = createBrowserClient("https://dwxuqztqiskahoyvwxbn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3eHVxenRxaXNrYWhveXZ3eGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxOTkwNjAsImV4cCI6MjAxNTc3NTA2MH0.wA2T6VIjU_0VDaZxnGi9hGBl-w0ZYVLNnZwRQtNpb38"); 
// //   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// //   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// //    const supabase = createClient(supabaseUrl, supabaseAnonKey)
//    //console.log(supabaseUrl);
   export default supabase;

// // import { createClient } from '@supabase/supabase-js'
// // export const supabase = createClient(supabaseUrl, supabaseAnonKey)
