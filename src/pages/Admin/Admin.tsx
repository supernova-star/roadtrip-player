import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SongSearchWorkspace } from '@/admin/components/songSearchWorkspace/SongSearchWorkspace';

export const Admin = () => {
  const navigate = useNavigate();

  return <SongSearchWorkspace onGoHome={() => navigate('/home')} />;
};
