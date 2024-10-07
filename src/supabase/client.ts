import { createClient } from "@supabase/supabase-js";

const URL = "https://cbaprfoxvsjsruqbwxbz.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!KEY) throw new Error("supabaseKey가 준비되어 있지 않습니다.");

export const supabase = createClient(URL, KEY);
