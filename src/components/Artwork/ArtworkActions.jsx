import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import ImageDownloadButton from '../Button/ImageDownloadButton';
import PropTypes from 'prop-types';
import addLikeService from '../../services/interactions/addLikeService';
import { useAuth } from '../../context/Auth/AuthContext';

const ArtworkActions = ({ artwork, user }) => {
  console.log('image url:', artwork.image_url);

  const { userEmail } = useAuth();

  const onChange = async () => {
    console.log('User Email for actions:', userEmail);
    try {
      console.log('Adding like for artworkId:', artwork.artwork_id);
      const result = await addLikeService(artwork.artwork_id, userEmail);

      if (result) {
        console.log('Like added successfully:', result);
      } else {
        console.warn('No data returned from addLikeService');
      }
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-auto mt-5">
      <div className="flex flex-row">
        <button
          className="flex items-center py-2 mr-5 text-neutral-400 text-sm hover:text-dark-primary"
          onClick={onChange}
        >
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
    artwork_id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default ArtworkActions;
