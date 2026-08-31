import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Start } from './pages/Start/Start';
import { Admin } from './pages/Admin/Admin';
import { AdminRoute } from './pages/Admin/AdminRoute';
import { NotFound } from './pages/NotFound/NotFound';
import { usePresence } from './hooks/usePresence';
import { useUserProfileStore } from './store/userProfileStore';

interface StartRouteProps {
  hasEnteredHome: boolean;
  onEnterHome: () => void;
}

const StartRoute: React.FC<StartRouteProps> = ({
  hasEnteredHome,
  onEnterHome,
}) => {
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
  const userName = useUserProfileStore((state) => state.userName);
  usePresence(userName);

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
          element={
            <StartRoute
              hasEnteredHome={hasEnteredHome}
              onEnterHome={handleEnterHome}
            />
          }
        />

        <Route
          path="/home"
          element={<HomeRoute onEnterHome={handleEnterHome} />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route path="/not-found" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
