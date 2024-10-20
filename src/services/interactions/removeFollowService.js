import { supabaseClient } from '../supaBase';

const removeFollowService = async (followerId, followingId) => {
  const { data, error } = await supabaseClient
    .from('follow')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId);

  if (error) {
    console.error('Error unfollowing user:', error);
    return { error: 'Error unfollowing user.' };
  }

  return { success: 'Unfollowed successfully.', data };
};
export default removeFollowService;
