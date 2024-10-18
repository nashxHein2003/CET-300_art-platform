import React from 'react';
import { useUser } from '../../../context/User/UserContext';
import PropTypes from 'prop-types';

const Authorized = ({ children }) => {
  const { userInfo } = useUser();

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { userInfo });
  });

  return <div>{childrenWithProps}</div>;
};

Authorized.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authorized;
