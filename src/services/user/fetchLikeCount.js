import { supabaseClient } from '../supaBase';

const fetchLikeCount = async (artworkId) => {
  console.log('Fetching like for artworkId:', artworkId);

  const { count, error } = await supabaseClient
    .from('like')
    .select('*', { count: 'exact' })
    .eq('artwork_id', artworkId);

  if (error) {
    console.error('Error fetching like count:', error);
    return null;
  }

  console.log('Returned like count:', count);
  return count;
};

export default fetchLikeCount;
