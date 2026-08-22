import React from 'react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Switch } from '@/components/uiComponents/switch/Switch';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { IconTile } from './IconTile';

export type ToggleRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export const ToggleRow: React.FC<ToggleRowProps> = ({
  icon,
  title,
  subtitle,
  checked,
  disabled = false,
  onChange,
}) => (
  <RowFlexContainer
    alignItems="center"
    gap={[3]}
    padding={[3, 4]}
    minHeight="70px"
    style={{ opacity: disabled ? 0.5 : 1 }}
  >
    <IconTile>{icon}</IconTile>
    <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
      <Typography variant="body2" weight="semiBold" color="var(--player-text-primary)">
        {title}
      </Typography>
      <Typography variant="caption" color="var(--player-text-secondary)">
        {subtitle}
      </Typography>
    </ColumnFlexContainer>
    <Switch
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
      size="small"
    />
  </RowFlexContainer>
);
