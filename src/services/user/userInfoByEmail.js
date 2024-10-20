import { supabaseClient } from '../supaBase';

const UserInfoByEmail = async (email) => {
  console.log('User email:', email);
  const { data, error } = await supabaseClient
    .from('user')
    .select('*')
    .eq('email', email);

  console.log('data:', data);

  if (error) {
    console.error('Error fetching user info:', error);
    return null;
  }

  // Ensure that data is returned and it's not empty
  if (data && data.length > 0) {
    return data; // Return the first user object if it exists
  }

  return null;
};

export default UserInfoByEmail;
