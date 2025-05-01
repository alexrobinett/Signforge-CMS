import jwtDecode from 'jwt-decode';
import { useAuth as useAuthContext } from '../app/context/AuthContext';

const useDecodedAuth = () => {
  const { token } = useAuthContext();
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
export default useDecodedAuth;
