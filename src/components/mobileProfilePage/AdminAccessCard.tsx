import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { percentToHex } from '@/utils/formatter';

type AdminAccessCardProps = {
  accent: string;
  isOpen: boolean;
  password: string;
  onToggle: () => void;
  onPasswordChange: (value: string) => void;
};

export const AdminAccessCard: React.FC<AdminAccessCardProps> = ({
  accent,
  isOpen,
  password,
  onToggle,
  onPasswordChange,
}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // const env = import.meta.env as Record<string, string | undefined>;
  // const expectedPassword = env.VITE_ADMIN_PASSWORD ?? env.ADMIN_PASSWORD ?? '';

  // const handleGoClick = () => {
  //   const matches = password === expectedPassword;

  //   if (!matches) {
  //     onPasswordChange('');
  //     setErrorMessage('Password does not match.');
  //     return;
  //   }

  //   setErrorMessage('');
  //   navigate('/admin', { replace: true });
  // };

  const handleGoClick = async () => {
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        onPasswordChange('');
        setErrorMessage(data?.error ?? 'Password does not match.');
        return;
      }

      onPasswordChange('');
      navigate('/admin', { replace: true });
    } catch {
      setErrorMessage('Unable to connect. Please try again.');
    }
  };

  return (
    <ColumnFlexContainer gap={[2]}>
      <RowFlexContainer
        alignItems="center"
        gap={[3]}
        padding={[3]}
        cursor="pointer"
        onClick={onToggle}
        role="button"
        style={{
          borderRadius: '12px',
          border: '1px solid rgba(255, 190, 140, 0.35)',
          background: `linear-gradient(135deg, ${percentToHex(accent, 34)} 0%, ${percentToHex(accent, 22)} 100%)`,
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.04), 0 8px 20px rgba(0,0,0,0.12)',
        }}
      >
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[9]}
          height={[9]}
          borderRadius={[2]}
          style={{
            backgroundColor: percentToHex(accent, 44),
            flexShrink: 0,
          }}
        >
          <Shield size="18px" color="var(--player-accent)" />
        </RowFlexContainer>
        <Typography
          variant="body1"
          weight="semiBold"
          color="var(--player-text-primary)"
          sx={{ flex: 1 }}
        >
          Admin
        </Typography>
      </RowFlexContainer>

      {isOpen && (
        <ColumnFlexContainer gap={[1]}>
          <RowFlexContainer alignItems="center" gap={[2]}>
            <Input
              type="password"
              value={password}
              placeholder="Admin password"
              onChange={(event) => {
                onPasswordChange(event.target.value);
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
              sx={{
                flex: 1,
                color: 'var(--player-text-primary)',
                background: 'var(--background-dark-transparent)',
                borderRadius: '10px',
                padding: '2px 12px',
                '&::before, &::after': { display: 'none' },
                '& input': {
                  color: 'var(--player-text-primary)',
                  fontSize: '15px',
                  padding: '8px 0',
                },
                '& input::placeholder': {
                  color: 'var(--player-text-secondary)',
                  opacity: 0.8,
                },
              }}
            />
            <Button
              text="Go"
              variant="contained"
              size="small"
              buttonStyles={{ bgColor: accent, borderRadius: [2] }}
              onClick={handleGoClick}
              sx={{ minWidth: '64px' }}
            />
          </RowFlexContainer>

          {errorMessage && (
            <Typography variant="caption" color="var(--player-text-secondary)">
              {errorMessage}
            </Typography>
          )}
        </ColumnFlexContainer>
      )}
    </ColumnFlexContainer>
  );
};
