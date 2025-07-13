import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

// --- API Call ---
const fetchPlayerPlaylist = async (playerId) => {
  const { data } = await axiosInstance.get(`/player/playlist/?id=${playerId}`);
  // Sort playlist by position
  const loadedPlaylist = data
    .map((message) => ({ ...message, id: message._id }))
    .sort((a, b) => a.position - b.position);
  return loadedPlaylist;
};

// --- React Query Hook ---
export function usePlayerPlaylist(playerId) {
  return useQuery({
    queryKey: ['playerPlaylist', playerId],
    queryFn: () => fetchPlayerPlaylist(playerId),
    enabled: !!playerId,
  });
}

