import React, { useEffect, useState } from 'react';
import AppLayout from '../../../components/ Layout/AppLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import artworkDetailService from '../../../services/artworkDetailService';
import useSideBarState from '../../../hooks/useSideBarState';
import SideBar from '../../../components/Sidebar/SideBar';
import Navbar from '../../../components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEllipsisH,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment as fasComment } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import userServiceById from '../../../services/userServiceById';
import galleryByUserService from '../../../services/galleryByUserService';

const ArtworkDetail = () => {
  const navigate = useNavigate();
  const { control, sidebarMenu } = useSideBarState();
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [userArt, setUserArt] = useState([]);
  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        const data = await artworkDetailService(id);
        console.log(data);
        setArtwork(data);

        if (data && data.user_id) {
          const userData = await userServiceById(data.user_id);
          const userArt = await galleryByUserService(data.user_id);
          console.log(userData);
          console.log(userArt);
          setUser(userData || []);
          setUserArt(userArt || []);
        }
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
          <div className="flex-1 h-full flex flex-col">
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
                <div className="w-full h-auto flex flex-row justify-between items-center">
                  <div className="flex flex-row flex-1 justify-start">
                    <button className="flex items-center py-2 text-white transition-colors duration-200 hover:text-dark-primary ">
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

                <div className="flex flex-row w-full h-auto mt-5">
                  <Link className="w-14 h-14 rounded-md overflow-hidden mr-5">
                    <img
                      src={user.profile_url}
                      alt=""
                      className="h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <h2 className="font-bold text-2xl text-white">
                      {artwork.title}
                    </h2>
                    <span className="text-neutral-400 text-sm font-extralight">
                      by{' '}
                      <Link className="text-white text-lg font-bold">
                        {user.known_as}
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

                <div className="flex flex-row w-full h-auto mt-5">
                  <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm transition-colors duration-200 hover:text-dark-primary ">
                    <FontAwesomeIcon
                      icon={fasHeart}
                      className="mr-2 hover:text-dark-primary"
                    />
                    Favourites
                  </button>

                  <button className="flex items-center py-2 mr-5 text-neutral-400 text-sm transition-colors duration-200 hover:text-dark-primary ">
                    <FontAwesomeIcon
                      icon={fasComment}
                      className="mr-2 hover:text-dark-primary"
                    />
                    Comments
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 h-full flex flex-col bg-dark-primary-theme items-center p-5">
            <div className="w-full h-auto flex flex-row justify-between items-center">
              <Link className="text-white font-bold text-lg hover:underline">
                <span>More by {user.known_as}</span>
              </Link>

              <button className="flex items-center py-2 text-white transition-colors duration-200 hover:text-dark-primary ">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2 hover:text-dark-primary"
                />
                Follow
              </button>
            </div>

            <div className="w-full h-auto grid grid-cols-3 gap-4">
              {userArt &&
                userArt.length > 0 &&
                userArt.map((userArt) => (
                  <Link
                    key={userArt.artwork_id}
                    to={`/artworkDetail/${userArt.artwork_id}`}
                    className="overflow-hidden h-20"
                  >
                    <img
                      src={userArt.image_url}
                      alt={`Art piece #${userArt.artwork_id}`}
                      className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:brightness-50"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ArtworkDetail;
