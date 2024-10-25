import { supabaseClient } from '../supaBase';

const fetchLikeCount = async (artworkId) => {
  const { count, error } = await supabaseClient
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('artwork_id', artworkId);

  if (error) {
    console.error('Error fetching like count:', error);
    return null;
  }
  return count;
};

export default fetchLikeCount;
