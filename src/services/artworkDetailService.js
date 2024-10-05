import { supabaseClient } from './supaBase';

const artworkDetailService = async (artworkId) => {
  const { data, error } = await supabaseClient
    .from('artwork')
    .select('*')
    .eq('artwork_id', artworkId)
    .single();

  if (error) {
    console.error('Error fetching artwork:', error);
    return null;
  }
  return data;
};

export default artworkDetailService;
