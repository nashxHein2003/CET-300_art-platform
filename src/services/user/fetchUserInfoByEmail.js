import { supabaseClient } from '../supaBase';

const fetchUserInfoByEmail = async (userEmail) => {
  const { data, error } = await supabaseClient
    .from('user')
    .select('*')
    .eq('email', userEmail)
    .single();

  if (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
  return data;
};

export default fetchUserInfoByEmail;
