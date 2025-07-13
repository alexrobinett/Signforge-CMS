import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DemoPage } from '../../components/DemoPage';

export const Route = createFileRoute('/dashboard/demo')({
  component: (): JSX.Element => <DemoPage />,
});