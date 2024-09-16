import { faChartArea, faEye, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBar = ({ control }) => {
  return (
    <div className=" bg-dark-primary-theme h-full fixed z-10">
      {[
        [faHome, './home', 'Home'],
        [faEye, './follow', 'Following'],
        [faChartArea, './activity', 'Activity'],
      ].map(([iconName, url, title], index) => (
        <div
          className={`transition-width duration-500 group ${control.isExpanded ? 'w-60' : ''} p-6 hover:bg-dark-primary-hover`}
          key={index}
        >
          <NavLink
            to={url}
            className="flex flex-row items-stretch gap-x-3"
            activeClassName="active-link"
            exact
          >
            <FontAwesomeIcon
              icon={iconName}
              size="md"
              className="text-white group-hover:text-dark-primary"
            />
            <span
              className={`${control.isExpanded ? '' : 'hidden'} ml-3 sidebar-text font-light group-hover:text-dark-primary`}
            >
              {title}
            </span>
          </NavLink>
        </div>
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
