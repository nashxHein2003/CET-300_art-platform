import React, { useEffect, useState } from 'react';
import { fetchArtworkByTagName } from '../../services/artwork/fetchArtworkByTagName';
import fetchArtworkById from '../../services/artwork/fetchArtworkById';

const useArtworkByTag = (tagName) => {
  const [artwork, setArtwork] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ids = await fetchArtworkByTagName(tagName);
        // id is in list, by many id. i want to make it map and fetch image by id, one by one from fetchArtworkById(id)

        // const arts = await Promise.all(
        //   id.map(async (artworkId) => {
        //     console.log('artworkId:', artworkId);
        //     const artworkData = await fetchArtworkById(artworkId);

        //     return artworkData;
        //   })
        // );

        // const fetchedArtworks = await Promise.all(ids.map(fetchArtworkById()));
        // setArtwork(fetchedArtworks.flat());

        if (Array.isArray(ids) && ids.length > 0) {
          const image = await Promise.all(
            ids.map(async (arts) => {
              const data = await fetchArtworkById(arts.artwork_id);
              return data;
            })
          );
          console.log('image result:', image);
          setArtwork(image);
        }
      } catch (err) {
        console.log('Error fetching artwork by tag name:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tagName) {
      fetchData();
    }
  }, [tagName]);

  return { artwork, loading };
};

export default useArtworkByTag;
