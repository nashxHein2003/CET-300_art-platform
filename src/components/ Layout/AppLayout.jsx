import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col relative mt-20 bg-dark-lighter-theme">
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
