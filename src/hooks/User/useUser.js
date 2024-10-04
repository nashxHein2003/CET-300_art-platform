import { useContext } from 'react';
import UserContext from '../../context/User/UserContext';

const useUser = () => {
  const userContext = useContext(UserContext);

  return {
    userInfo: userContext.userInfo,
    loading: userContext.loading,
  };
};

export default useUser;
