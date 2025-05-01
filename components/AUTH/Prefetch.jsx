import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { fetchImages } from '../../app/features/images/imagesApi';
import { fetchPlayers } from '../../app/features/players/playersApi';
import { fetchMessages } from '../../app/features/message/messagesApi';

function Prefetch() {
  const { userID } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({ queryKey: ['images'], queryFn: fetchImages });
    queryClient.prefetchQuery({ queryKey: ['players'], queryFn: fetchPlayers });
    queryClient.prefetchQuery({ queryKey: ['messages'], queryFn: fetchMessages });
  }, [userID, queryClient]);

  return <Outlet />;
}

export { Prefetch };