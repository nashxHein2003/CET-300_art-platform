import { supabase } from './supaBase';

const userServiceById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', id)
    .single();

  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }
  return data;
};

export default userServiceById;
