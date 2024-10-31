import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ArtworkStatus = ({ like }) => (
  <div className="flex flex-row w-full h-auto mt-5">
    <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm hover:text-dark-primary">
      <FontAwesomeIcon icon={faHeart} className="mr-2" />
      <span className="mr-1">{like}</span>
      Favourites
    </button>
    <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm hover:text-dark-primary">
      <FontAwesomeIcon icon={faComment} className="mr-2" />
      Comments
    </button>
  </div>
);

ArtworkStatus.propTypes = {
  like: PropTypes.number,
};

export default ArtworkStatus;
