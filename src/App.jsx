

import { CardBadgeEX } from '../components/CardBadgeEX';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import ImagePage from '../components/Images/ImagePage';

import { DashboardLayout } from '../components/DashboardLayout';
import { assetLoader } from '../components/Images/ImageGallery';
import { Error } from '../components/error';
import { LoginPage } from '../components/LoginPage';


function App() {


 const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path='/' element={<LoginPage/>}/>
  <Route path='/login' element={<LoginPage/>}/>
  <Route path='/dashboard' element={<DashboardLayout />}>
      <Route path='/dashboard/' element={<CardBadgeEX/>} loader={assetLoader} error={Error}/>
      <Route path='/dashboard/players' element={<ImagePage />} loader={assetLoader} error={Error}/>
      <Route path='/dashboard/messages' element={<ImagePage />} loader={assetLoader} error={Error}/>
      <Route path='/dashboard/assets' element={<ImagePage />} loader={assetLoader}  error={Error}/>
      <Route path='/dashboard/demo' element={<CardBadgeEX />} />
  </Route>
  <Route path='*' element={<h1>404 PAGE NOT FOUND!</h1>}/>
  </>
 
 ))

  return (
    <RouterProvider router={router}/> 
     
  )
}


export {App}