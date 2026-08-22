import React from 'react';
import { Slider } from '@mui/material';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { IconTile } from './IconTile';

export type RangeRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: number;
  options: number[];
  suffix: string;
  disabled?: boolean;
  onChange: (value: number) => void;
};

export const RangeRow: React.FC<RangeRowProps> = ({
  icon,
  title,
  subtitle,
  value,
  options,
  suffix,
  disabled = false,
  onChange,
}) => (
  <ColumnFlexContainer gap={[3]} padding={[3, 4]} style={{ opacity: disabled ? 0.5 : 1 }}>
    <RowFlexContainer alignItems="center" gap={[3]}>
      <IconTile>{icon}</IconTile>
      <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
        <Typography variant="body2" weight="semiBold" color="var(--player-text-primary)">
          {title}
        </Typography>
        <Typography variant="caption" color="var(--player-text-secondary)">
          {subtitle}
        </Typography>
      </ColumnFlexContainer>
      <Typography variant="caption" weight="semiBold" color="var(--player-accent)">
        {value}
        {suffix}
      </Typography>
    </RowFlexContainer>
    <Slider
      min={options[0]}
      max={options[options.length - 1]}
      step={options[1] - options[0]}
      value={value}
      disabled={disabled}
      onChange={(_, nextValue) => onChange(Array.isArray(nextValue) ? nextValue[0] : nextValue)}
      sx={{
        color: 'var(--player-accent)',
        '& .MuiSlider-rail': { color: 'var(--player-border)' },
      }}
    />
  </ColumnFlexContainer>
);
