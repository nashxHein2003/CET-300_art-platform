import React, { useEffect, useState } from 'react';
import AppLayout from '../../../components/Layout/AppLayout';
import { useParams, useNavigate } from 'react-router-dom';
import useArtworkDetail from '../../../hooks/Artwork/useArtworkDetail';
import Navbar from '../../../components/Navbar/Navbar';
import SideBar from '../../../components/Sidebar/SideBar';
import useSideBarState from '../../../hooks/useSideBarState';
import {
  ArtworkActions,
  ArtworkHeader,
  ArtworkImage,
  UserGallery,
} from './../../../components/export';
import useArtworkTag from '../../../hooks/Artwork/useArtworkTag';
import ArtworkStatus from '../../../components/Artwork/ArtworkStatus';
import useArtworkLike from '../../../hooks/Artwork/useArtworkLike';
import PropTypes from 'prop-types';
import { useAuth } from '../../../context/Auth/AuthContext';
import CommentSection from '../../../components/Artwork/CommentSection';
import { supabaseClient } from '../../../services/supaBase';

const ArtworkDetailMain = ({ userInfo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, toggleSidebar } = useSideBarState();
  const { artwork, user, userArt, loading } = useArtworkDetail(id);
  const { token, userEmail } = useAuth(); // Accessing the email here

  const {
    artworkTags,
    loading: tagsLoading,
    error: tagsError,
  } = useArtworkTag(artwork.artwork_id);
  const { like } = useArtworkLike(artwork.artwork_id);

  const [currentUser, setCurrentUser] = useState(null); // Store the whole user object

  // Fetch the user info based on the user's email
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userEmail) {
        const { data, error } = await supabaseClient
          .from('user')
          .select('*') // Select all fields
          .eq('email', userEmail);

        if (error) {
          console.error('Error fetching user info:', error);
        } else if (data.length > 0) {
          setCurrentUser(data[0]); // Store the whole user object
        }
      }
    };

    fetchUserInfo();
  }, [userEmail]);

  if (loading || tagsLoading) return <div>Loading...</div>;
  if (!artwork) return <div>No artwork found</div>;
  if (tagsError) return <div>Error loading tags: {tagsError.message}</div>;

  return (
    <AppLayout>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-row relative">
        <SideBar control={control} />
        <div className="flex-1 h-full flex flex-col">
          <ArtworkImage artwork={artwork} onBackClick={() => navigate('/')} />
          <div className="w-1000 h-full flex flex-col items-center bg-dark-primary-theme">
            <div className="w-900 max-w-1200 min-w-900 h-auto flex flex-col">
              <ArtworkActions artwork={artwork} user={user} />
              <ArtworkHeader user={user} artwork={artwork} />
              <ArtworkStatus like={like} />

              {/* Artwork Tags */}
              <div className="w-full h-auto flex flex-row flex-wrap mt-5">
                {artworkTags.map((tag) => (
                  <span
                    key={tag.tag_id}
                    className="text-sm border-gray-600 border-1 text-white px-4 py-2 rounded mr-2"
                  >
                    {tag.tag_name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="w-full h-auto mt-10 mb-10">
                <span className="text-white text-sm font-light">
                  {artwork.description}
                </span>
              </div>
              <hr className="bg-gray-500 border-gray-500" />
              <CommentSection artwork={artwork} currentUser={currentUser} />
            </div>
          </div>
        </div>

        {/* Pass only the userId to UserGallery */}

        <UserGallery userArt={userArt} user={user} userId={currentUser?.id} />

        {/* Fill the left height with black color */}
      </div>
    </AppLayout>
  );
};

ArtworkDetailMain.propTypes = {
  userInfo: PropTypes.shape(),
};

export default ArtworkDetailMain;
