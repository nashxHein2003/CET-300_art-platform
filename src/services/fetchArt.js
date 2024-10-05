import { supabaseClient } from './supaBase';

export const fetchArt = async () => {
  try {
    const { data, error } = await supabaseClient.from('artwork').select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return null;
  }
};
