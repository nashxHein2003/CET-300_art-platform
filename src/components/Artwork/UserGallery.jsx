import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import addFollowService from '../../services/interactions/addFollowService';
import removeFollowService from '../../services/interactions/removeFollowService';
import { supabaseClient } from '../../services/supaBase';

const UserGallery = ({ userArt, user, userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkIfFollowing = async () => {
      if (userId && user[0]?.id) {
        const { data, error } = await supabaseClient
          .from('follow')
          .select('*')
          .eq('follower_id', userId)
          .eq('following_id', user[0].id);

        if (error) {
          console.error('Error checking follow status:', error);
        } else {
          setIsFollowing(data.length > 0);
        }
      }
    };

    checkIfFollowing();
  }, [userId, user]);

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        const result = await removeFollowService(userId, user[0].id);
        setIsFollowing(false);
      } else {
        const result = await addFollowService(userId, user[0].id);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  const displayedArt = userArt.slice(0, 9); // Limit to 9 items

  return (
    <div className="w-96 flex-grow flex flex-col bg-dark-primary-theme p-5">
      <div className="w-96 h-auto flex flex-row justify-between items-center mb-5">
        <Link className="text-white font-bold text-lg hover:underline">
          More by {user[0]?.known_as || 'Unknown User'}
        </Link>

        <button
          className="w-auto flex items-center text-dark-primary text-sm transition-colors duration-20"
          onClick={toggleFollow}
        >
          <FontAwesomeIcon
            icon={isFollowing ? faCheck : faPlus}
            className="mr-2"
          />
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      <div className="w-96 h-auto grid grid-cols-3 gap-2 ">
        {displayedArt.map((art) => (
          <Link key={art.artwork_id} to={`/artworkDetail/${art.artwork_id}`}>
            <img
              src={art.image_url}
              alt={`Art piece #${art.artwork_id}`}
              className="w-full h-32 object-cover transition-transform duration-300 ease-in-out hover:brightness-50"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

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
  userId: PropTypes.number,
};

export default UserGallery;
