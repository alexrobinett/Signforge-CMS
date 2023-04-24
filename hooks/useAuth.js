import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let userID = null;
  let firstName = null;
  let email = null;

  if (token) {
    const decoded = jwtDecode(token);
    const { email, userId, name } = decoded.UserInfo;

    userID = userId;
    firstName = name;
    localStorage.setItem('userID', JSON.stringify(userID));

    return { userID, firstName, email };
  }
  return { userID, firstName, email };
};
export default useAuth;
