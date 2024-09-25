import React, { useEffect, useState } from 'react';
import AppLayout from '../../../components/ Layout/AppLayout';
import { useNavigate, useParams } from 'react-router-dom';
import artworkDetailService from '../../../services/artworkDetailService';
import useSideBarState from '../../../hooks/useSideBarState';
import SideBar from '../../../components/Sidebar/SideBar';
import Navbar from '../../../components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';

const ArtworkDetail = () => {
  const navigate = useNavigate();
  const { control, sidebarMenu } = useSideBarState();
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        const data = await artworkDetailService(id);
        console.log(data);
        setArtwork(data);
      } catch (err) {
        console.log('Failed to load artwork details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getDetail();
    }
  }, [id]);

  if (!artwork) {
    return <div>No artwork found</div>;
  }

  return (
    <AppLayout>
      <Navbar sidebarMenu={sidebarMenu} />
      <div className="flex-1 flex flex-row relative">
        <SideBar control={control} />
        <div className="w-16 h-lvh bg-dark-lighter-theme z-0"></div>
        <div className="flex-1 h-full flex flex-row ">
          <div className="w-4/5 h-full flex flex-col">
            <div className="w-full h-750 flex flex-col justify-center relative group">
              <button
                onClick={() => navigate('/')}
                className="absolute left-10 top-5 flex items-center px-4 py-2 text-white transition-colors duration-200 hover:text-dark-primary opacity-0 group-hover:opacity-100"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="mr-2 hover:text-dark-primary"
                />
                Home
              </button>

              <div className="w- 3/4 h-6/7 flex justify-center align-center relative">
                <img
                  src={artwork.image_url}
                  alt={`Art piece #${artwork.artwork_id}`}
                  className="h-full object-cover group-hover:scale-101 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-center bg-dark-primary-theme">
              <div className="w-900 h-750 flex flex-col">
                <div className="w-full h-auto p-1 flex flex-row justify-between items-center">
                  <div className="flex flex-row flex-1 justify-start">
                    <button className="flex items-center px-4 py-2 text-white transition-colors duration-200 hover:text-dark-primary ">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="mr-2 hover:text-dark-primary"
                      />
                      Add to favourite
                    </button>
                    <button className="flex items-center px-4 py-2 text-white transition-colors duration-200 hover:text-dark-primary ">
                      <FontAwesomeIcon
                        icon={faComment}
                        className="mr-2 hover:text-dark-primary"
                      />
                      Comment
                    </button>
                  </div>
                  <div className="flex-1 flex flex-row items-center justify-end">
                    <button className="flex items-center px-4 py-2 text-white transition-colors duration-200 hover:text-dark-primary ">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="mr-2 hover:text-dark-primary"
                      />
                    </button>
                    <button className="flex items-center px-4 py-2 text-white transition-colors duration-200 hover:text-dark-primary ">
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="mr-2 hover:text-dark-primary"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/5 h-full flex flex-col bg-dark-primary-theme items-center">
            <div className="w-full h-750"></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ArtworkDetail;
