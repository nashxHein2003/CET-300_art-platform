import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/Auth/AuthContext';
import fetchUserInfoByEmail from '../../../services/user/fetchUserInfoByEmail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import UserFeatured from '../UserFeatured/UserFeatured';
import UserAbout from '../UserAbout/UserAbout';
import CoverImageUploadModal from './CoverImageUploadModal';
import {
  supabaseClient,
  supabaseCoverImageUrl,
} from '../../../services/supaBase';
import { v4 as uuidv4 } from 'uuid';
import useFollower from '../../../hooks/User/useFollower';

const UserProfile = () => {
  const { userEmail } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { follower } = useFollower(userInfo?.id ?? null);

  const getUserInfo = useCallback(async () => {
    if (userEmail) {
      setLoading(true);
      try {
        const data = await fetchUserInfoByEmail(userEmail);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [userEmail]);

  // Fetch user info on component mount and whenever userEmail changes
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleUpload = async (file) => {
    const filePath = `${userInfo.user_id}/cover_image.jpg`;
    if (!userInfo) return;

    const { data, error } = await supabaseClient.storage
      .from('cover_image')
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error('Error uploading image:', error);
      return;
    }

    // Update the cover image in the user table
    const updateCoverImage = async (userId, imagePath) => {
      const imageUrl = `${supabaseCoverImageUrl}/cover_image/${userId}/${imagePath}`;
      const { data, error } = await supabaseClient
        .from('user')
        .update({ cover_url: imageUrl })
        .match({ user_id: userId });

      if (error) {
        console.error('Error updating cover image:', error);
      } else {
        console.log('Cover image updated successfully:', data);

        // Refresh user info after a successful upload
        await getUserInfo(); // Re-fetch user info to reflect updated cover image
      }
    };

    updateCoverImage(userInfo.user_id, `cover_image.jpg`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>No user information found</div>;
  }
  return (
    <>
      <div className="w-full h-full flex flex-col relative">
        <div
          className="w-full h-80 relative"
          style={{
            backgroundImage: `url(${userInfo.cover_url ?? ''})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute bottom-0 w-full flex flex-row py-10 px-16 items-center">
            <Link className="w-32 h-32 rounded-xl overflow-hidden border-dark-primary border-1 border-double">
              {userInfo.profile_url !== null ? (
                <img
                  src={userInfo.profile_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                ''
              )}
            </Link>
            <div className="flex flex-col flex-1 px-5 gap-2">
              <h1 className="text-white text-5xl font-bold">
                {userInfo.username}
              </h1>
              <span className="text-white text-lg font-light">
                {userInfo.known_as}
              </span>

              <span className="text-white text-sm font-light">
                {follower} Followers
              </span>
            </div>
            {userInfo.cover_url === null && (
              <button
                className="w-auto flex items-center px-4 py-2 text-white bg-dark-primary rounded-3xl transition-colors duration-20 "
                onClick={() => setModalOpen(true)}
              >
                <FontAwesomeIcon icon={faImage} className="mr-2" />
                Add cover image
              </button>
            )}
          </div>
        </div>
        <div className="w-full bg-dark-lighter-nav px-12">
          <div className="inline-block p-6 space-x-16 text-white text-sm font-light">
            <button>Home</button>
            <button>Gallery</button>
            <button>Favourites</button>
            <button>Posts</button>
            <button>About</button>
            <button>Shop</button>
          </div>
        </div>

        {/* This is for home tab */}
        <div className="flex-1 bg-dark-primary-theme flex flex-row">
          <div className="flex-1 flex flex-col">
            <UserFeatured userId={userInfo.id} />
          </div>

          <div className="w-700 h-500">
            <UserAbout userInfo={userInfo} />
          </div>
        </div>

        <CoverImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onUpload={handleUpload}
        />
      </div>
    </>
  );
};

export default UserProfile;
