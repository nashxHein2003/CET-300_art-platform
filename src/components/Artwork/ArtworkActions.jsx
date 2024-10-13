// components/ArtworkActions.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import ImageDownloadButton from '../Button/ImageDownloadButton';
import PropTypes from 'prop-types';

const ArtworkActions = ({ artwork }) => {
  console.log('image url:', artwork.image_url);
  return (
    <div className="flex flex-row justify-between items-center w-full h-auto mt-5">
      <div className="flex flex-row">
        <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm hover:text-dark-primary">
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Favourites
        </button>
        <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm hover:text-dark-primary">
          <FontAwesomeIcon icon={faComment} className="mr-2" />
          Comments
        </button>
      </div>
      <div className="flex flex-row">
        <ImageDownloadButton imageUrl={artwork.image_url} />
      </div>
    </div>
  );
};

ArtworkActions.propTypes = {
  artwork: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtworkActions;
