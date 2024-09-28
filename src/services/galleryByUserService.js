import { supabaseClient } from './supaBase';

const galleryByUserService = async (userId) => {
  const { data, error } = await supabaseClient
    .from('artworks')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching artworks:', error);
    return null;
  }
  return data;
};

export default galleryByUserService;
