// AppProvider.js
import React from 'react';

import { ArtworkProvider } from '../context/Artwork/UserArtwork/ArtworkContext';
import PropTypes from 'prop-types';
import { AuthProvider, useAuth } from '../context/Auth/AuthContext';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ArtworkProvider>{children}</ArtworkProvider>
    </AuthProvider>
  );
};

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
