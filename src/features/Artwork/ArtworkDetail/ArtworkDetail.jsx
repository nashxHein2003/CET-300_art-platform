import React from 'react';
import PropTypes from 'prop-types';
import ArtworkDetailMain from './ArtworkDetailMain';

const ArtworkDetail = () => {
  return (
    <>
      <ArtworkDetailMain />
    </>
  );
};

ArtworkDetail.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArtworkDetail;
