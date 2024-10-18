import { supabaseClient } from '../supaBase';

const fetchArtTags = async (artworkId) => {
  const { data: tags, error: tagError } = await supabaseClient
    .from('artwork_tag')
    .select('*')
    .eq('artwork_id', artworkId);

  if (tagError) {
    console.log('Error fetching artwork tags:', tagError);
    return null;
  }

  if (tags && tags.length > 0) {
    const tagIds = tags.map((tag) => tag.tag_id);

    const { data: artTags, error: artTagError } = await supabaseClient
      .from('tags')
      .select('*')
      .in('tag_id', tagIds);

    if (artTagError) {
      console.log('Error fetching tag details:', artTagError);
      return null;
    }

    console.log('Artwork Tags:', artTags);
    return artTags;
  }

  console.log('No tags found for the artwork');
  return [];
};

export default fetchArtTags;
