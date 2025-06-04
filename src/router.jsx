import React from 'react';
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';

import { App } from './App';
import { HomePage } from './HomePage';
import { LoginPage } from '../components/LoginPage2';
import { SignUpPage } from '../components/SignUpPage';
import { DashboardLayout } from '../components/DashboardLayout';
import { PlayersPage } from '../components/players/PlayersPage';
import { MessagesPage } from '../components/messages/MessagePage';
import ImagePage from '../components/Images/ImagePage';
import { DemoPage } from '../components/DemoPage';
import { ComingSoon } from '../components/ComingSoon';
import { Welcome } from '../components/Welcome';
import { Prefetch } from '../components/AUTH/Prefetch';
import PersistLogin from '../components/AUTH/PersistLogin';
import { NotFoundPage } from '../components/NotFoundPage';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'home',
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: 'login',
  component: LoginPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: 'signuppage',
  component: SignUpPage,
});

const persistRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'persist',
  component: PersistLogin,
});

const prefetchRoute = createRoute({
  getParentRoute: () => persistRoute,
  id: 'prefetch',
  component: Prefetch,
});

const dashboardRoute = createRoute({
  getParentRoute: () => prefetchRoute,
  path: 'dashboard',
  component: DashboardLayout,
});

const welcomeRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: Welcome,
});

const playersRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'players',
  component: PlayersPage,
});

const playlistRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'playlist',
  component: ComingSoon,
});

const messagesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'messages',
  component: MessagesPage,
});

const assetsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'assets',
  component: ImagePage,
});

const demoRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'demo',
  component: DemoPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

rootRoute.addChildren([
  indexRoute,
  homeRoute.addChildren([loginRoute, signUpRoute]),
  persistRoute.addChildren([
    prefetchRoute.addChildren([
      dashboardRoute.addChildren([
        welcomeRoute,
        playersRoute,
        playlistRoute,
        messagesRoute,
        assetsRoute,
        demoRoute,
      ]),
    ]),
  ]),
  notFoundRoute,
]);

const router = createRouter({ routeTree: rootRoute });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
