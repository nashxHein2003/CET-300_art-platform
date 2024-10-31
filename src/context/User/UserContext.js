import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import fetchUserInfoByEmail from '../../services/user/fetchUserInfoByEmail';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { userEmail } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!userEmail) {
        setUserInfo(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log('Getting user info for:', userEmail);
        const data = await fetchUserInfoByEmail(userEmail);
        console.log('Fetched user data:', data);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [userEmail]);

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
