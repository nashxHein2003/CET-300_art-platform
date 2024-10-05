import { supabaseClient } from './supaBase';

const userServiceById = async (id) => {
  const { data, error } = await supabaseClient
    .from('user')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }
  return data;
};

export default userServiceById;
