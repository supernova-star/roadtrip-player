import React from 'react';
import { ChevronLeft } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

type MobileSettingsHeaderProps = {
  title: string;
  subtitle: string;
  onBack: () => void;
};

export const MobileSettingsHeader: React.FC<MobileSettingsHeaderProps> = ({
  title,
  subtitle,
  onBack,
}) => (
  <RowFlexContainer alignItems="center" gap={[3]} style={{ flexShrink: 0 }}>
    <RowFlexContainer
      alignItems="center"
      justifyContent="center"
      width={[10]}
      height={[10]}
      cursor="pointer"
      onClick={onBack}
      style={{ borderRadius: '999px', backgroundColor: 'var(--background-dark-transparent)' }}
    >
      <ChevronLeft size="20px" color="var(--player-text-primary)" />
    </RowFlexContainer>
    <ColumnFlexContainer gap={[1]}>
      <Typography variant="h5" weight="bold" color="var(--player-text-primary)">
        {title}
      </Typography>
      <Typography variant="caption" color="var(--player-text-secondary)">
        {subtitle}
      </Typography>
    </ColumnFlexContainer>
  </RowFlexContainer>
);
