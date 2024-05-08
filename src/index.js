import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './index.css';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { GamePage } from './pages/GamePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthContainer } from './containers/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<AuthContainer><HomePage /></AuthContainer>}/>
      <Route path="login" element={<LoginPage />}/>
      <Route path="signup" element={<SignUpPage />}/>
      <Route path="games/:id" element={<AuthContainer><GamePage /></AuthContainer>}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  </Router>
);
