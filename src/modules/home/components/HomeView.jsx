import React from 'react';
import Navbar from '../../core/components/Navbar';
import useSideBarState from '../states/useSideBarState';
import SideBar from '../../core/components/SideBar';

const HomeView = () => {
  const { control, sidebarMenu } = useSideBarState();
  return (
    <div className="w-full h-full flex flex-col relative mt-20">
      <Navbar sidebarMenu={sidebarMenu} />
      <div className="flex-1 flex flex-row relative">
        <SideBar control={control} />
        <div className="w-14 h-lvh bg-dark-lighter-theme z-0">Hello</div>
        <div className="flex-1 h-lvh bg-dark-lighter-theme p-5 "></div>
      </div>
    </div>
  );
};

export default HomeView;
