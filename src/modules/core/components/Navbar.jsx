import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ sidebarMenu }) => {
  return (
    <div className="w-full h-20 bg-dark-primary-theme flex flex-row items-center px-5 fixed top-0 z-10">
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

      <div className="flex flex-row  w-1/3items-center">
        <button className="mx-5">
          <span className="text-white hover:text-dark-primary">Join</span>
        </button>
        <button className="mx-5">
          <span className="text-white hover:text-dark-primary">Log In</span>
        </button>
        <button className="mx-5 px-3 py-2 bg-dark-lighter-theme rounded-lg">
          <FontAwesomeIcon
            icon={faUser}
            size="lg"
            className="text-white hover:text-dark-primary"
          />
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  sidebarMenu: PropTypes.func.isRequired,
};

export default Navbar;
