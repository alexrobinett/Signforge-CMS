import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '../app/queryClient';
import { App } from './App';
import './index.css';
import { AuthProvider } from '../app/context/AuthContext';



import { AppRouter } from './router';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}

    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </QueryClientProvider>
);
