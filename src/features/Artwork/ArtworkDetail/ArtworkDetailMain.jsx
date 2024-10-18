import React, { useEffect } from 'react';
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

const ArtworkDetailMain = ({ userInfo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, toggleSidebar } = useSideBarState();
  const { artwork, user, userArt, loading } = useArtworkDetail(id);
  const { token } = useAuth();

  const {
    artworkTags,
    loading: tagsLoading,
    error: tagsError,
  } = useArtworkTag(artwork.artwork_id);

  const { like } = useArtworkLike(artwork.artwork_id);

  if (loading || tagsLoading) return <div>Loading...</div>;
  if (!artwork) return <div>No artwork found</div>;
  if (tagsError) return <div>Error loading tags: {tagsError.message}</div>;

  console.log('user from detail:', user);
  console.log('User info:', userInfo);

  return (
    <AppLayout>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-row relative">
        <SideBar control={control} />
        <div className="flex-1 h-full flex flex-col">
          <ArtworkImage artwork={artwork} onBackClick={() => navigate('/')} />
          <div className="w-full h-full flex flex-col items-center bg-dark-primary-theme">
            <div className="w-900 h-750 flex flex-col">
              <ArtworkActions artwork={artwork} user={user} />
              <ArtworkHeader user={user} artwork={artwork} />
              <ArtworkStatus like={like} />

              {/* Artwork Tag */}
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
              <div className="w-full h-auto mt-10">
                <span className="text-white text-sm font-light">
                  {artwork.description}
                </span>
              </div>
            </div>
          </div>
        </div>
        <UserGallery userArt={userArt} user={user} />
      </div>
    </AppLayout>
  );
};

ArtworkDetailMain.propTypes = {
  artwork: PropTypes.shape({
    artwork_id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  userInfo: PropTypes.shape(),
};

export default ArtworkDetailMain;
