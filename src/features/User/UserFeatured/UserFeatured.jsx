import React, { useEffect, useState } from 'react';
import galleryByUserService from '../../../services/galleryByUserService';
import PropTypes from 'prop-types';

const UserFeatured = ({ userId }) => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        setLoading(true);
        const featuredArt = await galleryByUserService(userId);
        console.log(featuredArt);
        setFeatured(featuredArt || []);
      } catch (err) {
        console.log('Failed to load artwork details');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getFeatured();
    }
  }, [userId]);

  return (
    <div className="flex-1 h-auto p-16">
      <h1 className="block text-white text-xl font-bold">Featured Gallery</h1>
      <div className="flex flex-wrap gap-4 mt-10">
        {featured.map((artwork, index) => (
          <div
            key={index}
            className="relative bg-dark-lighter-nav overflow-hidden"
            style={{
              height: '240px',
              flex: '1 0 auto',
              maxWidth: '700px',
            }}
          >
            <img
              src={artwork.image_url}
              alt={artwork.title}
              className="h-full w-full object-cover transform hover:scale-110 transition duration-500 ease-in-out"
              style={{ flexShrink: 3 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFeatured;

UserFeatured.propTypes = {
  userId: PropTypes.number.isRequired,
};
