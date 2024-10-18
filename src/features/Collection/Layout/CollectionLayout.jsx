import React from 'react';
import AppLayout from '../../../components/Layout/AppLayout';
import { UserProvider } from '../../../context/User/UserContext';
import Navbar from '../../../components/Navbar/Navbar';
import SideBar from '../../../components/Sidebar/SideBar';
import useSideBarState from '../../../hooks/useSideBarState';
import { useAuth } from '../../../context/Auth/AuthContext';
import MainCollection from '../MainCollection/MainCollection';

const CollectionLayout = () => {
  const { control, toggleSidebar } = useSideBarState();
  const { token } = useAuth();
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
        <div className="flex-1 w-full h-full bg-dark-lighter-theme px-2">
          <MainCollection />
        </div>
      </div>
    </AppLayout>
  );
};

export default CollectionLayout;
