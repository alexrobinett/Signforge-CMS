import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { DashboardLayout } from '../../components/DashboardLayout';
import PersistLogin from '../../components/AUTH/PersistLogin';
import { Prefetch } from '../../components/AUTH/Prefetch';

export const Route = createFileRoute('/dashboard')({
  component: (): JSX.Element => (
    <PersistLogin>
      <Prefetch>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </Prefetch>
    </PersistLogin>
  ),
});