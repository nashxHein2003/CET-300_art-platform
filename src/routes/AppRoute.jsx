import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from '../modules/home/components/HomeView';
import LoginView from '../modules/auth/pages/LoginView';
import RegisterView from '../modules/auth/pages/RegisterView';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/home" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
