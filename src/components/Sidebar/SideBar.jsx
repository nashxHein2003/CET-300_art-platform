import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faEye, faHome } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const SideBar = ({ control }) => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isCollection = location.pathname === '/collection';

  if (!isHome && !control.isExpanded && !isCollection) {
    return null;
  }

  const menuItems = [
    { icon: faHome, url: '/', title: 'Home' },
    { icon: faEye, url: '/collection', title: 'Collections' },
    { icon: faChartArea, url: '/activity', title: 'Activity' },
  ];

  return (
    <div
      className={`${
        control.isExpanded ? 'w-60' : 'w-16'
      } bg-dark-primary-theme h-full fixed z-10 text-sm transition-width duration-300`}
    >
      {menuItems.map(({ icon, url, title }, index) => (
        <NavLink
          key={index}
          to={url}
          end
          className={({ isActive }) =>
            `flex items-center gap-x-3 p-6 transition-colors duration-300 ${
              isActive
                ? 'bg-dark-primary-hover text-dark-primary'
                : 'text-white'
            } group hover:bg-dark-primary-hover`
          }
        >
          <FontAwesomeIcon icon={icon} size="md" />
          <span
            className={`${
              control.isExpanded ? 'block' : 'hidden'
            } ml-3 font-lighter sidebar-text transition-all duration-500`}
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
