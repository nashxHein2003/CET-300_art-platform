import { supabaseClient } from '../supaBase';

const fetchFollowerCount = async (userId) => {
  console.log('Fetching followers for userId:', userId);

  const { count, error } = await supabaseClient
    .from('follow')
    .select('*', { count: 'exact' }) // '*' ensures all rows are counted, no need to specify columns
    .eq('following_id', userId); // Make sure userId matches your following_id

  // const { count, error } = await supabaseClient
  //   .from('artwork')
  //   .select('*', { count: 'exact' });

  // const { data, error } = await supabaseClient.from('artwork_tags').select('*');
  // console.log('Return data:', data);

  if (error) {
    console.error('Error fetching follower count:', error);
    return null;
  }

  console.log('Returned follower count:', count);
  return count;
};

export default fetchFollowerCount;
