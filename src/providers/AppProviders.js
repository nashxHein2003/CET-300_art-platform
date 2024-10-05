// AppProvider.js
import React from 'react';
import { UserProvider } from '../context/User/UserContext';
import { AuthProvider } from '../context/Auth/AuthContext';
import { ArtworkProvider } from '../context/Artwork/UserArtwork/ArtworkContext';
import PropTypes from 'prop-types';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ArtworkProvider>{children}</ArtworkProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
