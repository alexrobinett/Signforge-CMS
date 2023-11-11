import { LoginPage } from '../components/LoginPage';
import { HomePage } from './HomePage.jsx';
import React from 'react';

function App() {
  return (
    <>
      <HomePage m={0} />
      <LoginPage />
    </>
  );
}

export { App };
