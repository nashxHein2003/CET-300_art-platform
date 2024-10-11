// components/ArtworkActions.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';

const ArtworkActions = () => (
  <div className="flex flex-row w-full h-auto mt-5">
    <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm hover:text-dark-primary">
      <FontAwesomeIcon icon={faHeart} className="mr-2" />
      Favourites
    </button>
    <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm hover:text-dark-primary">
      <FontAwesomeIcon icon={faComment} className="mr-2" />
      Comments
    </button>
  </div>
);

export default ArtworkActions;
