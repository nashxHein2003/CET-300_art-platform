import React, { createContext, useContext, useEffect, useState } from 'react';
import galleryByUserService from '../../../services/galleryByUserService';
import PropTypes from 'prop-types';

const ArtworkContext = createContext();

export const ArtworkProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArtworks = async (userId) => {
    setLoading(true);
    try {
      const data = await galleryByUserService(userId);
      setArtworks(data || []);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArtworkContext.Provider value={{ artworks, loading, fetchArtworks }}>
      {children}
    </ArtworkContext.Provider>
  );
};

export const useArtwork = () => {
  return useContext(ArtworkContext);
};

ArtworkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
