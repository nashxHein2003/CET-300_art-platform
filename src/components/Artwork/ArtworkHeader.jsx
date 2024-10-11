import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ArtworkHeader = ({ user = { known_as: 'Unknown Artist' }, artwork }) => (
  <div className="flex flex-row w-full h-auto mt-5">
    <Link className="w-14 h-14 rounded-md overflow-hidden mr-5">
      {/* Use optional chaining to avoid errors if profile_url is undefined */}
      <img
        src={user?.profile_url || '/default-profile.png'}
        alt="User Profile"
        className="h-full object-cover"
      />
    </Link>
    <div className="flex-1 flex flex-col">
      <h2 className="font-bold text-2xl text-white">{artwork.title}</h2>
      <span className="text-neutral-400 text-sm font-extralight">
        by{' '}
        <Link className="text-white text-lg font-bold">
          {user?.known_as || 'Unknown User'}
        </Link>
      </span>
    </div>
    <span className="text-neutral-400 font-extralight text-sm">
      Published at:{' '}
      {new Date(artwork.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </span>
  </div>
);

export default ArtworkHeader;

ArtworkHeader.propTypes = {
  artwork: PropTypes.shape({
    title: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    profile_url: PropTypes.string,
    known_as: PropTypes.string,
  }),
};
