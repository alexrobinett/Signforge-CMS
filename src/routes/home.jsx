import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { HomePage } from '../HomePage';

export const Route = createFileRoute('/home')({
  component: () => (
    <>
      <HomePage />
      <Outlet />
    </>
  ),
});