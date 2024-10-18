import { useState, useEffect } from 'react';
import fetchArtTags from '../../services/tags/fetchArtTags';
import fetchTags from '../../services/tags/fetchTags';

const useTag = () => {
  const [tag, setTag] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTags = async () => {
      try {
        const tags = await fetchTags();
        setTag(tags);
      } catch (err) {
        setError(err);
        console.error('Error fetching artwork tags:', err);
      } finally {
        setLoading(false);
      }
    };

    getTags();
  }, []);

  return { tag, loading, error };
};

export default useTag;
