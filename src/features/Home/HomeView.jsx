import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import useSideBarState from '../../hooks/useSideBarState';
import SideBar from '../../components/Sidebar/SideBar';
import ArtworkGallery from '../Artwork/ArtworkGallery/ArtworkGallery';
import AppLayout from '../../components/Layout/AppLayout';
import { UserProvider } from '../../context/User/UserContext';
import { useAuth } from '../../context/Auth/AuthContext';

const HomeView = () => {
  const { control, toggleSidebar } = useSideBarState();
  const { token } = useAuth();
  console.log('Check token from home: ', token);
  return (
    <AppLayout>
      {token ? (
        <UserProvider>
          <Navbar toggleSidebar={toggleSidebar} />
        </UserProvider>
      ) : (
        <Navbar toggleSidebar={toggleSidebar} />
      )}

      <div className="flex-1 flex flex-row relative">
        <SideBar control={control} />
        <div className="w-16 h-lvh bg-dark-lighter-theme z-0"></div>
        <div className="flex-1 w-full h-full bg-dark-lighter-theme px-2 py-2">
          <ArtworkGallery />
        </div>
      </div>
    </AppLayout>
  );
};

export default HomeView;
