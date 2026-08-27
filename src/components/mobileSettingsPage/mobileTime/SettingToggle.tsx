import React from 'react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Switch } from '@/components/uiComponents/switch/Switch';

export const SettingToggle: React.FC<{
  title: string;
  subtitle?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ title, subtitle, checked, disabled, onChange }) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="between"
    gap={[3]}
    padding={[3]}
    style={{
      borderRadius: '8px',
      backgroundColor: 'var(--background-dark-transparent)',
      border: '1px solid var(--player-border)',
      opacity: disabled ? 0.55 : 1,
    }}
  >
    <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
      <Typography
        variant="body2"
        weight="semiBold"
        color="var(--player-text-primary)"
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="var(--player-text-secondary)">
          {subtitle}
        </Typography>
      )}
    </ColumnFlexContainer>
    <Switch
      size="small"
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  </RowFlexContainer>
);
