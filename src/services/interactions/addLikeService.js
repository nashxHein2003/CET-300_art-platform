import { supabaseClient } from '../supaBase';

const addLikeService = async (artworkId, userEmail) => {
  const { data: existingLike, error: checkError } = await supabaseClient
    .from('likes')
    .select('*')
    .eq('artwork_id', artworkId)
    .eq('liked', userEmail);

  if (checkError) {
    console.error('Error checking like status:', checkError);
    return { error: 'Error checking like status.' };
  }

  if (existingLike.length > 0) {
    console.log('User has already liked this artwork.');
    return { error: 'You have already liked this artwork.' };
  }

  const { data, error } = await supabaseClient.from('likes').insert([
    {
      artwork_id: artworkId,
      liked: userEmail,
    },
  ]);

  if (error) {
    console.error('Error adding like:', error);
    return { error: 'Error adding like.' };
  }

  console.log('Like added successfully:', data);
  return { success: 'Like added successfully.', data };
};

export default addLikeService;
