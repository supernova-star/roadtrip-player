import { AuthenticationLoading } from '@/admin/components/authenticationLoading/AuthenticationLoading';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type AdminRouteProps = {
  children: React.ReactNode;
};

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/api/admin/check');

        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isChecking) {
    return <AuthenticationLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
};
