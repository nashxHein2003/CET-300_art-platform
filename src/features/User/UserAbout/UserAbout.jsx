import React from 'react';
import PropTypes from 'prop-types';

const UserAbout = ({ userInfo }) => {
  return (
    <div className="w-full h-auto bg-dark-primary-theme pt-16">
      <h1 className="text-white text-xl font-bold">
        About {userInfo.username}
      </h1>
    </div>
  );
};

export default UserAbout;

UserAbout.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
