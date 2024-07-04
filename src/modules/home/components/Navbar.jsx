import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-dark-primary-theme flex flex-row items-center px-5">
      <FontAwesomeIcon icon={faBars} size="xl" className="text-dark-primary" />
      <div className="flex-1 flex justify-center items-center">
        <span className="logo-text">CenturyArt</span>
      </div>
    </div>
  );
};

export default Navbar;
