import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/Auth/AuthContext';
import fetchUserInfoByEmail from '../../../services/user/fetchUserInfoByEmail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import UserFeatured from '../UserFeatured/UserFeatured';
import UserAbout from '../UserAbout/UserAbout';
const UserProfile = () => {
  const { userEmail } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('UserProfile', userEmail);

  useEffect(() => {
    const getUserInfo = async () => {
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
    };
    getUserInfo();
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>No user information found</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-72 relative">
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
          </div>
          <button className="w-auto flex items-center px-4 py-2 text-white bg-dark-primary rounded-3xl transition-colors duration-20 ">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Add cover image
          </button>
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
    </div>
  );
};

export default UserProfile;
