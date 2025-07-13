import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

// --- API Calls ---
const fetchUsers = async () => {
  const { data } = await axiosInstance.get('/user/');
  const loadedUsers = data.map((user) => ({ ...user, id: user._id }));
  return loadedUsers;
};

const addUser = async (userData) => {
  const { data } = await axiosInstance.post('/user', userData);
  return data;
};

const updateUser = async ({ id, file }) => {
  const { data } = await axiosInstance.patch(`/user/${id}`, { updateName: `${file}` });
  return data;
};

const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/user/${id}`);
  return data;
};

// --- React Query Hooks ---
export function useUsers() {
  return useQuery(['users'], fetchUsers);
}

export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}

