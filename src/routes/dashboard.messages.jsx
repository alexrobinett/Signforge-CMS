import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MessagesPage } from '../../components/messages/MessagePage';

export const Route = createFileRoute('/dashboard/messages')({
  component: () => <MessagesPage />,
});