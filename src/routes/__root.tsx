import React from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '../../app/queryClient';
import { AuthProvider } from '../../app/context/AuthContext';

export const Route = createRootRoute({
  component: (): JSX.Element => (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      <AuthProvider>
        <Outlet />
        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </AuthProvider>
    </QueryClientProvider>
  ),
});