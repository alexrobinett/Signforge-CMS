import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { injectAuthHelpers } from '../api/axiosInstance';

interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthState {
  token: string | null;
  user: User | null;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [auth, setAuth] = useState<AuthState>({ token: null, user: null });

  // Provide a getToken function for axiosInstance
  useEffect(() => {
    function getToken(): string | null {
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

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
export type { AuthState, User, AuthContextType };
