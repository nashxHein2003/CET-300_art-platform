import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from '../features/Home/HomeView';
import LoginView from '../features/Auth/Login/LoginView';
import RegisterView from '../features/Auth/Register/RegisterView';
import ArtworkDetail from '../features/Artwork/ArtworkDetail/ArtworkDetail';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/artworkDetail/:id" element={<ArtworkDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
