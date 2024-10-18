import { supabaseClient } from '../supaBase';

const fetchArtworkById = async (artworkId) => {
  try {
    const { data, error } = await supabaseClient
      .from('artwork')
      .select('*')
      .eq('artwork_id', artworkId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching artwork image by id:', error);
    return null;
  }
};

export default fetchArtworkById;
