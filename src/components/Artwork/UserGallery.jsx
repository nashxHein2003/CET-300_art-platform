import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserGallery = ({ userArt, user = { known_as: 'Unknown User' } }) => (
  <div className="w-96 h-full flex flex-col bg-dark-primary-theme items-center p-5">
    <div className="w-full h-auto flex flex-row justify-between items-center mb-5">
      <Link className="text-white font-bold text-lg hover:underline">
        {/* Use optional chaining for user data and fallback to 'Unknown User' */}
        More by {user[0].known_as || 'Unknown User'}
      </Link>
    </div>
    <div className="w-full h-auto grid grid-cols-3 gap-2">
      {userArt.map((art) => (
        <Link key={art.artwork_id} to={`/artworkDetail/${art.artwork_id}`}>
          <img
            src={art.image_url}
            alt={`Art piece #${art.artwork_id}`}
            className="w-full h-24 object-cover transition-transform duration-300 ease-in-out hover:brightness-50"
          />
        </Link>
      ))}
    </div>
  </div>
);

UserGallery.propTypes = {
  userArt: PropTypes.arrayOf(
    PropTypes.shape({
      artwork_id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    known_as: PropTypes.string,
  }),
};

export default UserGallery;
