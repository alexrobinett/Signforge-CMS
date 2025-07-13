import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '../../components/SignUpPage';

export const Route = createFileRoute('/home/signup')({
  component: () => <SignUpPage />,
});