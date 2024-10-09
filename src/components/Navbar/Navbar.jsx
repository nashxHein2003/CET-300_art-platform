import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../context/Auth/AuthContext';
import { useUser } from '../../context/User/UserContext';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { token, userEmail, clearToken } = useAuth();
  //const { userInfo } = useUser();
  //console.log('User info from nav', userInfo);
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
        <Link className="logo-text" to={'/'}>
          CenturyArt
        </Link>
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
              className={`absolute top-12 right-0 w-72 space-y-2 overflow-hidden py-2 bg-dark-lighter-theme ease-in-out text-white rounded-lg transition-all duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              {/* <button
                className="w-full text-left text-lg font-bold px-4 py-3"
                onClick={() => {
                  if (token !== null) {
                    navigate('/userProfile');
                  }
                }}
              >
                {userInfo.username}
              </button> */}

              <ModalTab
                text="Logout"
                onClick={() => {
                  clearToken();
                  setTimeout(() => {
                    navigate('/');
                  }, 0);
                }}
              />
            </div>
          )}
        </button>

        <button className="w-auto flex items-center px-6 py-2 text-white bg-dark-primary transition-colors duration-20 ">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Submit
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;

const ModalTab = ({ text, onClick }) => {
  return (
    <button
      className="w-full text-left text-sm px-4 py-3 hover:bg-dark-primary-hover"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

ModalTab.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
