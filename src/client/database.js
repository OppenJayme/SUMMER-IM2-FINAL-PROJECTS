import { createClient } from '@supabase/supabase-js'
const supabaseUrl = REACT_APP_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
