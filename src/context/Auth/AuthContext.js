import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parseJwt from '../../utils/jwt';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Use localStorage here
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setToken(parsedToken);
      const decodedToken = parseJwt(parsedToken);
      setUserEmail(decodedToken?.email);
      console.log('User email:', decodedToken?.email);
    }
  }, []);

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken)); // Use localStorage here
    setToken(userToken);
    const decodedToken = parseJwt(userToken);
    setUserEmail(decodedToken?.email); // Set user email after saving token
  };

  const clearToken = () => {
    localStorage.removeItem('token'); // Use localStorage here
    setToken(null);
    setUserEmail(null); // Clear user email when logging out
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
