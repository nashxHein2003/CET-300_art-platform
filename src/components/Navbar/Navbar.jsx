import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ sidebarMenu }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-20 bg-dark-primary-theme flex flex-row items-center px-6 fixed top-0 z-10 border-b-1 border-b-grey">
      <button onClick={sidebarMenu}>
        <FontAwesomeIcon
          icon={faBars}
          size="xl"
          className="text-white hover:text-dark-primary"
        />
      </button>

      <div className="flex-1 flex ml-10 justify-start items-center">
        <span className="logo-text">CenturyArt</span>
      </div>

      <div className="flex flex-row items-center justify-end">
        <Link to={'/login'}>
          <button className="mx-5">
            <span className="text-white hover:text-dark-primary">Join</span>
          </button>
        </Link>

        <button className="mx-5" onClick={() => navigate('/login')}>
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
