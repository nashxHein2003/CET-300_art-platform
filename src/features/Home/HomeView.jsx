import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import useSideBarState from '../../hooks/useSideBarState';
import SideBar from '../../components/Sidebar/SideBar';
import ArtworkGallery from '../Artwork/ArtworkGallery/ArtworkGallery';
import AppLayout from '../../components/ Layout/AppLayout';

const HomeView = () => {
  const { control, sidebarMenu } = useSideBarState();
  return (
    <AppLayout>
      <Navbar sidebarMenu={sidebarMenu} />
      <div className="flex-1 flex flex-row relative">
        <SideBar control={control} />
        <div className="w-16 h-lvh bg-dark-lighter-theme z-0"></div>
        <div className="flex-1 h-full px-5 py-3 ">
          <ArtworkGallery />
        </div>
      </div>
    </AppLayout>
  );
};

export default HomeView;
