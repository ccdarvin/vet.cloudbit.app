import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://qzwftzyrbrkkvbgsuizx.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6d2Z0enlyYnJra3ZiZ3N1aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0ODcxMzEsImV4cCI6MjAxMTA2MzEzMX0.RvjeTLeopwv5JwPiKpwv5X2kWsDEaR-FT0NAx8TONK4";
  

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
