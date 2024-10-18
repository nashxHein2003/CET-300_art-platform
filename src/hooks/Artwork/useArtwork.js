import { useEffect, useState } from 'react';
import { fetchArt } from '../../services/fetchArt';

const useArtwork = () => {
  const [artwork, setArtwork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    const getArtwork = async () => {
      try {
        setLoading(true);
        const arts = await fetchArt();
        setArtwork(arts);
      } catch (err) {
        setError(err);
        console.log('Error from useArtwork:', err);
      } finally {
        setLoading(false);
      }
    };
    getArtwork();
  });

  return { artwork, loading, error };
};

export default useArtwork;
