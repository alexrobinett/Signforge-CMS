import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

// --- API Calls ---
export const fetchImages = async () => {
  const { data } = await axiosInstance.get('/images/');
  return data.map((image) => ({ ...image, id: image._id }));
};

const addImage = async (imageData) => {
  const { data } = await axiosInstance.post('/images', imageData);
  return data;
};

const updateImage = async ({ id, file }) => {
  const { data } = await axiosInstance.patch(`/images/${id}`, { updateName: `${file}` });
  return data;
};

const deleteImage = async (id) => {
  const { data } = await axiosInstance.delete(`/images/${id}`);
  return data;
};

// --- React Query Hooks ---
export function useImages(filters = {}) {
  return useQuery({
    queryKey: ['images', filters],
    queryFn: fetchImages,
  });
}

export function useAddImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['images'] }),
  });
}

export function useUpdateImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['images'] }),
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['images'] }),
  });
}

