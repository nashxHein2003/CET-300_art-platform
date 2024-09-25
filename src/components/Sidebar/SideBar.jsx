import { faChartArea, faEye, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { hover } from '@testing-library/user-event/dist/hover';

const SideBar = ({ control }) => {
  return (
    <div
      className={`${control.isExpanded ? 'w-60' : ''} bg-dark-primary-theme h-full fixed z-10`}
    >
      {[
        [faHome, '/', 'Home'],
        [faEye, '/follow', 'Following'],
        [faChartArea, '/activity', 'Activity'],
      ].map(([iconName, url, title], index) => (
        <NavLink
          key={index}
          to={url}
          end
          className={({ isActive }) =>
            `flex flex-row items-stretch gap-x-3 p-6 group ${
              isActive ? 'active-link bg-dark-primary-hover' : ''
            } hover:bg-dark-primary-hover`
          }
          exact
        >
          <FontAwesomeIcon
            icon={iconName}
            size="md"
            className={`transition-colors duration-300 ${
              window.location.pathname === url
                ? 'text-dark-primary'
                : 'text-white'
            } `}
          />
          <span
            className={`${control.isExpanded ? '' : 'hidden'} ml-3 sidebar-text font-lighter ${
              window.location.pathname === url
                ? 'text-dark-primary'
                : 'text-white'
            }`}
          >
            {title}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

SideBar.propTypes = {
  control: PropTypes.shape({
    isExpanded: PropTypes.bool.isRequired,
  }).isRequired,
};

export default SideBar;
