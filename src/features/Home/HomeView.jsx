import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import useSideBarState from '../../hooks/useSideBarState';
import SideBar from '../../components/Sidebar/SideBar';
import ArtworkGallery from '../Artwork/ArtworkGallery/ArtworkGallery';
import { PropTypes } from 'prop-types';

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

const AppLayout = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col relative mt-20 bg-dark-lighter-theme">
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomeView;
