import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminShell } from '@/admin/components/AdminShell';

export const Admin = () => {
  const navigate = useNavigate();

  return <AdminShell onGoHome={() => navigate('/home')} />;
};
