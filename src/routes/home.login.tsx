import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../../components/LoginPage2';

export const Route = createFileRoute('/home/login')({
  component: (): JSX.Element => <LoginPage />,
});