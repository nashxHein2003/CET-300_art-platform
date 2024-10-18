// hooks/useArtworkDetail.js
import { useState, useEffect } from 'react';
import artworkDetailService from '../../services/artworkDetailService';
import userServiceById from '../../services/userServiceById';
import galleryByUserService from '../../services/galleryByUserService';

const useArtworkDetail = (id) => {
  const [artwork, setArtwork] = useState([]);
  const [user, setUser] = useState({});
  const [userArt, setUserArt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const artworkData = await artworkDetailService(id);
        setArtwork(artworkData);
        if (artworkData?.user_id) {
          const userData = await userServiceById(artworkData.user_id);
          const userArtworks = await galleryByUserService(artworkData.user_id);
          console.log('user data:', userData);
          setUser(userData);
          setUserArt(userArtworks);
        }
      } catch (err) {
        console.error('Error fetching artwork details', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  return { artwork, user, userArt, loading };
};

export default useArtworkDetail;
