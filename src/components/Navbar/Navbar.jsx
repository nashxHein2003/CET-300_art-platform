import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { token, userEmail, clearToken } = useAuth();
  console.log('token:', token);
  console.log('email:', userEmail);
  return (
    <div className="w-full h-20 bg-dark-primary-theme flex flex-row items-center px-6 fixed top-0 z-10 border-b-1 border-b-grey">
      <button onClick={toggleSidebar}>
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
        {token === null ? (
          <>
            <button className="mx-5" onClick={() => navigate('/register')}>
              <span className="text-white hover:text-dark-primary">Join</span>
            </button>

            <button className="mx-5" onClick={() => navigate('/login')}>
              <span className="text-white hover:text-dark-primary">Log In</span>
            </button>
          </>
        ) : null}

        <button
          className={`relative group mx-5 px-3 py-2 bg-dark-lighter-theme rounded-lg`}
          onClick={() => {
            if (token !== null) {
              navigate('/userProfile');
            }
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <FontAwesomeIcon
            icon={faUser}
            size="lg"
            className="text-white group-hover:text-dark-primary"
          />

          {token !== null && (
            <div
              className={`absolute top-12 right-0 p-4 w-48 bg-dark-lighter-theme ease-in-out text-white rounded-lg transition-all duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <p className="mb-4">User Info</p>
              <button
                className="w-full text-left py-1 px-2 hover:bg-dark-primary rounded-md"
                onClick={() => {
                  clearToken();
                  setTimeout(() => {
                    navigate('/');
                  }, 0);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
