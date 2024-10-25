import { supabaseClient } from '../supaBase';

const UserInfoByEmail = async (email) => {
  const { data, error } = await supabaseClient
    .from('user')
    .select('*')
    .eq('email', email);

  if (error) {
    console.error('Error fetching user info:', error);
    return null;
  }

  if (data && data.length > 0) {
    return data;
  }

  return null;
};

export default UserInfoByEmail;
