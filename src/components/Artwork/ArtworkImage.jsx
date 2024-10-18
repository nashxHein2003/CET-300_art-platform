// components/ArtworkImage.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ArtworkImage = ({ artwork, onBackClick }) => (
  <div className="w-full h-500 flex flex-col items-center justify-center relative group">
    <button
      onClick={onBackClick}
      className="absolute left-10 top-5 flex items-center px-4 py-2 text-white transition-colors duration-200 hover:text-dark-primary opacity-0 group-hover:opacity-100"
    >
      <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
      Home
    </button>
    <div className="h-3/4  flex justify-center align-center relative">
      <img
        src={artwork.image_url}
        alt={`Art piece #${artwork.artwork_id}`}
        className="h-full object-cover group-hover:scale-101 transition-transform duration-300"
      />
    </div>
  </div>
);

ArtworkImage.propTypes = {
  artwork: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    artwork_id: PropTypes.number.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default ArtworkImage;
