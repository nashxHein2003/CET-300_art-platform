import { supabaseClient } from '../supaBase';

const getCommentService = async (artworkId) => {
  const { data, error } = await supabaseClient
    .from('comment')
    .select('*')
    .eq('artwork_id', artworkId);

  if (error) {
    console.error('Error fetching comments:', error);
    return null;
  }

  return data;
};

export default getCommentService;
