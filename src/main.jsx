import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.css';

import { store } from '../app/store';

import ImagePage from '../components/Images/ImagePage';
import { DemoPage } from '../components/DemoPage';
import { PlayersPage } from '../components/players/PlayersPage';
import { DashboardLayout } from '../components/DashboardLayout';
import { LoginPage } from '../components/LoginPage';
import { ComingSoon } from '../components/ComingSoon';
import { NotFoundPage } from '../components/NotFoundPage';
import { SignUpPage } from '../components/SignUpPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { MessagesPage } from '../components/messages/MessagePage';
import { Prefetch } from '../components/AUTH/Prefetch';
import PersistLogin from '../components/AUTH/PersistLogin';
import { Welcome } from '../components/Welcome';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />}>
          <Route path="/home/login" element={<LoginPage />} />
          <Route path="/home/signuppage" element={<SignUpPage />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/dashboard/" element={<Welcome />} />
              <Route path="/dashboard/players" element={<PlayersPage />} />
              <Route path="/dashboard/playlist" element={<ComingSoon />} />
              <Route path="/dashboard/messages" element={<MessagesPage />} />
              <Route path="/dashboard/assets" element={<ImagePage />} />
              <Route path="/dashboard/demo" element={<DemoPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
