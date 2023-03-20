

import { DemoPage} from '../components/DemoPage'
import { PlayersPage } from '../components/players/PlayersPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ImagePage from '../components/Images/ImagePage';

import { DashboardLayout } from '../components/DashboardLayout';
import { BrowserRouter, Routes} from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';


function App() {
  return (

    <BrowserRouter>
      <Routes>   
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashboardLayout />}>
            <Route path='/dashboard/' element={<DemoPage/>}/>
            <Route path='/dashboard/players' element={<PlayersPage />} />
            <Route path='/dashboard/messages' element={<ImagePage />} />
            <Route path='/dashboard/assets' element={<ImagePage />}/>
            <Route path='/dashboard/demo' element={<DemoPage/>} />
        </Route>
        <Route path='*' element={<h1>404 PAGE NOT FOUND!</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}


export {App}