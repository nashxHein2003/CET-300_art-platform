import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from '../features/Home/HomeView';
import LoginView from '../features/Auth/Login/LoginView';
import RegisterView from '../features/Auth/Register/RegisterView';

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
