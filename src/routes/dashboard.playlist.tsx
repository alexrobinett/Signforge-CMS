import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ComingSoon } from '../../components/ComingSoon';

export const Route = createFileRoute('/dashboard/playlist')({
  component: (): JSX.Element => <ComingSoon />,
});