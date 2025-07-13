import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { AuthState } from '../../context/AuthContext';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Login
export function useLogin(): UseMutationResult<AuthResponse, Error, LoginCredentials> {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      console.log('useLogin mutation called with:', credentials);
      try {
        const response = await axiosInstance.post('/auth', credentials);
        console.log('axiosInstance.post /auth response:', response);
        const { data } = response;
        setAuth((prev: AuthState) => ({ ...prev, ...data }));
        return data;
      } catch (error) {
        console.error('Error in useLogin mutation:', error);
        throw error;
      }
    }
  });
}

// Logout
export function useLogout(): UseMutationResult<void, Error, void> {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await axiosInstance.post('/auth/logout');
      setAuth({ token: null, user: null });
    }
  });
}

// Refresh
export function useRefresh(): UseMutationResult<AuthResponse, Error, void> {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (): Promise<AuthResponse> => {
      const { data } = await axiosInstance.get('/auth/refresh');
      setAuth((prev: AuthState) => ({ ...prev, ...data }));
      return data;
    }
  });
}

export type { LoginCredentials, AuthResponse };
