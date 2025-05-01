import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

import { useEffect } from 'react';
import { injectAuthHelpers } from '../api/axiosInstance';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: null, user: null });

  // Provide a getToken function for axiosInstance
  useEffect(() => {
    function getToken() {
      return auth.token;
    }
    injectAuthHelpers({ getToken, setAuth });
  }, [auth.token, setAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
