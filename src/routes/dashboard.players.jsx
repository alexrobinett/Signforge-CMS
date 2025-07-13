import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PlayersPage } from '../../components/players/PlayersPage';

export const Route = createFileRoute('/dashboard/players')({
  component: () => <PlayersPage />,
});