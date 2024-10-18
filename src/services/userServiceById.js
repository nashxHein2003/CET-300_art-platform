import { supabaseAdmin, supabaseClient } from './supaBase';

const userServiceById = async (id) => {
  console.log('id:', id);
  const { data, error } = await supabaseClient
    .from('user')
    .select('*')
    .eq('id', id);

  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }
  return data;
};

export default userServiceById;
