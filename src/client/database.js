import { createClient } from '@supabase/supabase-js'
const supabaseUrl = REACT_APP_SUPABASE_URL
const supabaseKey = REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

