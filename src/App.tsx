import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Start } from './pages/Start/Start';

interface StartRouteProps {
  hasEnteredHome: boolean;
  onEnterHome: () => void;
}

const StartRoute: React.FC<StartRouteProps> = ({ hasEnteredHome, onEnterHome }) => {
  const navigate = useNavigate();
  const handleStart = useCallback(() => {
    onEnterHome();
    navigate('/home', { replace: true });
  }, [navigate, onEnterHome]);

  if (hasEnteredHome) {
    return <Navigate to="/home" replace />;
  }

  return <Start onButtonClick={handleStart} />;
};

interface HomeRouteProps {
  onEnterHome: () => void;
}

const HomeRoute: React.FC<HomeRouteProps> = ({ onEnterHome }) => {
  useEffect(() => {
    onEnterHome();
  }, [onEnterHome]);

  return <Home />;
};

export const App: React.FC = () => {
  const [hasEnteredHome, setHasEnteredHome] = useState(false);
  const handleEnterHome = useCallback(() => {
    setHasEnteredHome(true);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<StartRoute hasEnteredHome={hasEnteredHome} onEnterHome={handleEnterHome} />}
        />
        <Route path="/home" element={<HomeRoute onEnterHome={handleEnterHome} />} />
        <Route path="*" element={<Navigate to={hasEnteredHome ? '/home' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
