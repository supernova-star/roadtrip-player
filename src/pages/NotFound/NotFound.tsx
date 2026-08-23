import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ColumnFlexContainer
      alignItems="center"
      justifyContent="center"
      gap={[4]}
      width="100%"
      height="100vh"
      padding={[6]}
      style={{
        background: 'var(--background-dark)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" weight="bold" color="var(--player-text-primary)">
        404
      </Typography>

      <ColumnFlexContainer gap={[1]} alignItems="center">
        <Typography
          variant="h5"
          weight="semiBold"
          color="var(--player-text-primary)"
        >
          This road does not exist.
        </Typography>

        <Typography variant="body2" color="var(--player-text-secondary)">
          The page you are looking for is not available.
        </Typography>
      </ColumnFlexContainer>

      <RowFlexContainer>
        <Button
          text="Back to Casette"
          variant="contained"
          size="medium"
          onClick={() => navigate('/home', { replace: true })}
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
