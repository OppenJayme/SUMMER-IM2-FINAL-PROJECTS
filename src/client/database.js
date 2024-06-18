import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;



const userEmail;
const companyName;


const { data, error } = await supabase
  .from('company_t')
  .insert([
    { company_email: userEmail, company_name: companyName }
  ])
  .select();

if (error) {
  console.error('Error inserting company details:', error.message);
} else {
  console.log('Company details inserted successfully:', data);
}
