import React from 'react';
import AppLayout from '../../../components/Layout/AppLayout';
import Navbar from '../../../components/Navbar/Navbar';
import SideBar from '../../../components/Sidebar/SideBar';
import useSideBarState from '../../../hooks/useSideBarState';
import UserProfile from '../UserProfile/UserProfile';

const UserView = () => {
  const { control, toggleSidebar } = useSideBarState();
  return (
    <>
      <AppLayout>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-row relative">
          <SideBar control={control} />
          <div className="flex-1 w-full h-full bg-dark-lighter-theme">
            <UserProfile />
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default UserView;
