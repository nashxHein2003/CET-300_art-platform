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

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, toggleSidebar } = useSideBarState();
  const { artwork, user, userArt, follower, loading } = useArtworkDetail(id);

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

  return (
    <AppLayout>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-row relative">
        <SideBar control={control} />
        <div className="flex-1 h-full flex flex-col">
          <ArtworkImage artwork={artwork} onBackClick={() => navigate('/')} />
          <div className="w-full h-full flex flex-col items-center bg-dark-primary-theme">
            <div className="w-900 h-750 flex flex-col">
              <ArtworkActions artwork={artwork} />
              <ArtworkHeader user={user} artwork={artwork} />
              <ArtworkStatus like={like} />

              {/* Display Artwork Tags */}
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
            </div>
          </div>
        </div>
        <UserGallery userArt={userArt} user={user} />
      </div>
    </AppLayout>
  );
};

export default ArtworkDetail;
