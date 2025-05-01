import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';

// Login
export function useLogin() {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async (credentials) => {
      console.log('useLogin mutation called with:', credentials);
      try {
        const response = await axiosInstance.post('/auth', credentials);
        console.log('axiosInstance.post /auth response:', response);
        const { data } = response;
        setAuth((prev) => ({ ...prev, ...data }));
        return data;
      } catch (error) {
        console.error('Error in useLogin mutation:', error);
        throw error;
      }
    }
  });
}

// Logout
export function useLogout() {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post('/auth/logout');
      setAuth({ token: null, user: null });
    }
  });
}

// Refresh
export function useRefresh() {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.get('/auth/refresh');
      setAuth((prev) => ({ ...prev, ...data }));
      return data;
    }
  });
}
