import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

// --- API Calls ---
export const fetchPlayers = async () => {
  const { data } = await axiosInstance.get('/player/');
  const loadedPlayers = data.map((player) => ({ ...player, id: player._id }));
  return loadedPlayers;
};

export const addPlayer = async (playerData) => {
  const { data } = await axiosInstance.post('/player', playerData);
  return data;
};

export const updatePlayer = async ({ id, playerName }) => { 
  const { data } = await axiosInstance.patch(
    `/player/${id}`,
    { playerName, id },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
};

export const deletePlayer = async (id) => {
  const { data } = await axiosInstance.delete(`/player/${id}`);
  return data;
};

// --- React Query Hooks ---
export function usePlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
  });
}

// Reusable hook for dropdown options
export function usePlayerDropdownOptions() {
  return useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    select: (players) =>
      players.map(player => ({
        value: player.id,
        label: player.playerName,
      })),
  });
}

export function useAddPlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  });
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  });
}

export function useDeletePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  });
}

