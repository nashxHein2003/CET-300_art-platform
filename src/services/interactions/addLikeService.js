import { supabaseClient } from '../supaBase';

const addLikeService = async (artworkId, userEmail) => {
  console.log('Checking if user has already liked the artwork...');

  // Step 1: Check if the user has already liked the artwork
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

  // Step 2: Insert a new like if it doesn't exist
  console.log('Adding like for artworkId:', artworkId);

  const { data, error } = await supabaseClient.from('likes').insert([
    {
      artwork_id: artworkId,
      liked: userEmail, // Changed 'liked' to 'user_email' for consistency
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
