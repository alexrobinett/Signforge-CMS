

import { DemoPage} from '../components/DemoPage';
import { PlayersPage } from '../components/players/PlayersPage';
import { Route } from 'react-router-dom';

import ImagePage from '../components/Images/ImagePage';

import { DashboardLayout } from '../components/DashboardLayout';
import { BrowserRouter, Routes} from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';
import { imageApiSlice } from '../app/features/images/imagesAPI';
import { store } from '../app/store';
import { ComingSoon } from '../components/ComingSoon';
import { NotFoundPage } from '../components/NotFoundPage';
import { SignUpPage } from '../components/SignUpPage';
import { HomePage } from './HomePage.jsx';
import { Outlet } from 'react-router-dom';

function App() {

  return (  
    <>
      <HomePage m={0}/>
      <LoginPage/>
    </>
  );
}


export {App};