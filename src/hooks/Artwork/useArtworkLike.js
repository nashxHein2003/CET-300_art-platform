import { useEffect, useState } from 'react';
import fetchLikeCount from '../../services/user/fetchLikeCount';

const useArtworkLike = (artworkId) => {
  const [like, setLike] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLikeCount = async () => {
      try {
        const getLikeCount = await fetchLikeCount(artworkId);
        console.log('like:', getLikeCount);
        setLike(getLikeCount);
      } catch (err) {
        setError(err);
        console.error('Error fetching like count:', err);
      } finally {
        setLoading(false);
      }
    };

    if (artworkId) {
      getLikeCount();
    }
  }, [artworkId]);

  return { like, loading };
};

export default useArtworkLike;
