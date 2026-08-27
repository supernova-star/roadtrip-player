import React from 'react';
import { ArrowLeft, CassetteTape } from 'lucide-react';
import { IconButton } from '@mui/material';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { colorPalette } from '@/theme/colors';

type AdminHeaderProps = {
  onGoHome: () => void;
};

export const AdminHeader = ({ onGoHome }: AdminHeaderProps) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="between"
    padding={[5, 5]}
    sx={{ '@media (min-width: 600px)': { padding: '18px 32px' } }}
  >
    <RowFlexContainer alignItems="center" gap={[3]}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={[3]}
        sx={{
          width: 38,
          height: 38,
          borderRadius: 1.5,
          color: colorPalette.adminSurface,
          backgroundColor: colorPalette.adminDarkBrown,
        }}
      >
        <CassetteTape size={20} strokeWidth={1.8} />
      </Container>
      <ColumnFlexContainer gap={[0]}>
        <Typography
          variant="subtitle2"
          weight="bold"
          color="adminYellow"
          sx={{ letterSpacing: '0.08em' }}
        >
          CASETTE
        </Typography>
        <Typography
          variant="caption"
          weight="bold"
          color="adminMuted"
          sx={{ letterSpacing: '0.08em' }}
        >
          ADMIN
        </Typography>
      </ColumnFlexContainer>
    </RowFlexContainer>
    <IconButton
      aria-label="Back to Home"
      title="Back to Home"
      onClick={onGoHome}
      sx={{
        color: colorPalette.adminBrown,
        bgcolor: colorPalette.adminBackground,
      }}
    >
      <ArrowLeft size={20} />
    </IconButton>
  </RowFlexContainer>
);
