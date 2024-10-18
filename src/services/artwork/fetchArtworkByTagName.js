import { supabaseClient } from '../supaBase';

export const fetchArtworkByTagName = async (tagName) => {
  try {
    const { data, error } = await supabaseClient
      .from('artwork_tags')
      .select('artwork_id')
      .eq('tag_name', tagName);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return null;
  }
};
