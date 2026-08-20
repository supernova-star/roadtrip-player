import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Start } from './pages/Start/Start';

const StartRoute: React.FC = () => {
  const navigate = useNavigate();

  return <Start onButtonClick={() => navigate('/home')} />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartRoute />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
