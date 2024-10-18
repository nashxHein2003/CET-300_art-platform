// useArtworkTag.js (Hook)
import { useState, useEffect } from 'react';
import fetchArtTags from '../../services/tags/fetchArtTags';

const useArtworkTag = (artworkId) => {
  const [artworkTags, setArtworkTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArtworkTags = async () => {
      try {
        const tags = await fetchArtTags(artworkId);
        setArtworkTags(tags);
      } catch (err) {
        setError(err);
        console.error('Error fetching artwork tags:', err);
      } finally {
        setLoading(false);
      }
    };

    if (artworkId) {
      getArtworkTags();
    }
  }, [artworkId]);

  return { artworkTags, loading, error };
};

export default useArtworkTag;
