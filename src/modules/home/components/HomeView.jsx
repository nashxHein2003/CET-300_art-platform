import React from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';
import useSideBarState from '../states/useSideBarState';

const HomeView = () => {
  const { control, sidebarMenu } = useSideBarState();
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar sidebarMenu={sidebarMenu} />
      <div className="flex-1">
        <SideBar control={control} />
      </div>
    </div>
  );
};

export default HomeView;
