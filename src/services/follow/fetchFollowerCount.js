import { supabaseClient } from '../supaBase';

const fetchFollowerCount = async (userId) => {
  const { count, error } = await supabaseClient
    .from('follow')
    .select('*', { count: 'exact' })
    .eq('following_id', userId);
  if (error) {
    console.error('Error fetching follower count:', error);
    return null;
  }

  console.log('Returned follower count:', count);
  return count;
};

export default fetchFollowerCount;
