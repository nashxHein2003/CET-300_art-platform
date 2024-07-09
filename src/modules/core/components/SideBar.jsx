import { faChartArea, faEye, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBar = ({ control }) => {
  return (
    <div className=" bg-dark-primary-theme h-full fixed">
      {[
        [faHome, './home', 'Home'],
        [faEye, './follow', 'Following'],
        [faChartArea, './activity', 'Activity'],
      ].map(([iconName, url, title], index) => (
        <div
          className="group block p-5 hover:bg-dark-primary-hover"
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
              className={`${control.isExpanded ? '' : 'hidden'} sidebar-text group-hover:text-dark-primary`}
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
