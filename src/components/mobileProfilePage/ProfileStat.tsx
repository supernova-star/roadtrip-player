import React from 'react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { percentToHex } from '@/utils/formatter';

type ProfileStatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
};

export const ProfileStat: React.FC<ProfileStatProps> = ({ icon, label, value, accent }) => (
  <ColumnFlexContainer
    alignItems="center"
    justifyContent="center"
    gap={[1]}
    padding={[3, 1]}
    minHeight="82px"
  >
    <RowFlexContainer
      alignItems="center"
      justifyContent="center"
      width={[8]}
      height={[8]}
      style={{
        borderRadius: '10px',
        backgroundColor: percentToHex(accent, 12),
      }}
    >
      {icon}
    </RowFlexContainer>
    <Typography
      variant="caption"
      color="var(--player-text-secondary)"
      textAlign="center"
      sx={{ fontSize: '11px', lineHeight: 1.1 }}
    >
      {label}
    </Typography>
    <Typography
      variant="body1"
      weight="bold"
      color="var(--player-text-primary)"
      textAlign="center"
      sx={{ lineHeight: 1.05 }}
    >
      {value}
    </Typography>
  </ColumnFlexContainer>
);
