import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ sidebarMenu }) => {
  return (
    <div className="w-full h-20 bg-dark-primary-theme flex flex-row items-center px-5 relative">
      <button onClick={sidebarMenu}>
        <FontAwesomeIcon
          icon={faBars}
          size="xl"
          className="text-white hover:text-dark-primary"
        />
      </button>

      <div className="flex-1 flex justify-center items-center">
        <span className="logo-text">CenturyArt</span>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  sidebarMenu: PropTypes.func.isRequired,
};

export default Navbar;
