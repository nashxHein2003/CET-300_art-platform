import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parseJwt from '../../utils/jwt';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);
      const decodedToken = parseJwt(parsedToken);

      if (decodedToken && decodedToken.email) {
        setUserEmail(decodedToken.email);
        setUserId(decodedToken.sub);
        console.log(decodedToken);
      } else {
        console.error('Invalid token or missing email in token');
      }
    }
  }, []);

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
    const decodedToken = parseJwt(userToken);

    if (decodedToken && decodedToken.email) {
      setUserEmail(decodedToken.email);
    }
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserEmail(null);

    console.log('clear token:', token);
    console.log('clear email:', userEmail);
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
