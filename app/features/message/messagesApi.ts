import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

// --- API Calls ---
export const fetchMessages = async () => {
  const { data } = await axiosInstance.get('/messages');
  const loadedMessages = data.map((message) => ({ ...message, id: message._id }));
  return loadedMessages;
};

const addMessage = async (messageData) => {
  const { data } = await axiosInstance.post('/messages', messageData);
  return data;
};

const updateMessage = async (data) => {
  const { data: updated } = await axiosInstance.patch('/messages', data);
  return updated;
};

const deleteMessage = async (id) => {
  const { data } = await axiosInstance.delete(`/messages/${id}`);
  return data;
};

const updateMessagePosition = async ({ messageId, position }) => {
  const { data } = await axiosInstance.patch(`/messages/${messageId}`, { id: messageId, position });
  return data;
};

// --- React Query Hooks ---
export function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });
}

export function useAddMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
}

export function useUpdateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
}

export function useUpdateMessagePosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMessagePosition,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
}

