import { useEffect, useState } from 'react';
import fetchFollowerCount from '../../services/follow/fetchFollowerCount';

const useFollower = (userId) => {
  const [follower, setFollower] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFollower = async () => {
      setLoading(true);
      const followerCount = await fetchFollowerCount(userId);
      console.log('Follower count:', followerCount);
      setFollower(followerCount);
      setLoading(false);
    };
    fetchFollower();
  }, [userId]);

  return { follower, loading };
};

export default useFollower;
