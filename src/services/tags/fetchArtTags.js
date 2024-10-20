import { supabaseClient } from '../supaBase';

const fetchArtTags = async (artworkId) => {
  const { data: tags, error: tagError } = await supabaseClient
    .from('artwork_tags')
    .select('*')
    .eq('artwork_id', artworkId);

  if (tagError) {
    console.log('Error fetching artwork tags:', tagError);
    return null;
  }

  console.log('No tags found for the artwork');
  return tags;
};

export default fetchArtTags;
