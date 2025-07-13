import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ImagePage from '../../components/Images/ImagePage';

export const Route = createFileRoute('/dashboard/assets')({
  component: () => <ImagePage />,
});