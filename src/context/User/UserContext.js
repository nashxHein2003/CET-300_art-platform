// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import fetchUserInfoByEmail from '../../services/user/fetchUserInfoByEmail';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { userEmail } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      if (userEmail) {
        setLoading(true);
        try {
          const data = await fetchUserInfoByEmail(userEmail);
          setUserInfo(data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    getUserInfo();
  }, [userEmail]);

  console.log('User context:', userInfo);

  return (
    <UserContext.Provider value={{ userInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
