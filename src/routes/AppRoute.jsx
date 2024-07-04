import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from '../modules/home/components/HomeView';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
