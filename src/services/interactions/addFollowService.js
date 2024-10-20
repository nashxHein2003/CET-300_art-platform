import { supabaseClient } from '../supaBase';

const addFollowService = async (followerId, followingId) => {
  const { data: alreadyFollow, error: checkError } = await supabaseClient
    .from('follow')
    .select('*')
    .eq('follower_id', followerId)
    .eq('following_id', followingId);

  if (checkError) {
    console.error('Error checking if follow already exists:', checkError);
    return { error: 'Error checking follows.' };
  }

  if (alreadyFollow.length > 0) {
    return { error: 'You are already following this user.' };
  }

  const { data, error } = await supabaseClient.from('follow').insert([
    {
      follower_id: followerId,
      following_id: followingId,
    },
  ]);

  if (error) {
    return { error: 'Error following user.' };
  }

  return { success: 'Followed successfully.', data };
};
export default addFollowService;
