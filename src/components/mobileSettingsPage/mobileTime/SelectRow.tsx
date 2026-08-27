import React from 'react';
import { RowFlexContainer } from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Dropdown } from '@/components/uiComponents/dropdown/Dropdown';

export const SelectRow: React.FC<{
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="between"
    gap={[3]}
    padding={[2, 3]}
    style={{
      borderRadius: '8px',
      backgroundColor: 'var(--background-dark-transparent)',
      border: '1px solid var(--player-border)',
    }}
  >
    <Typography
      variant="body2"
      weight="semiBold"
      color="var(--player-text-primary)"
    >
      {label}
    </Typography>
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      size="small"
      textOptions={{
        textColor: 'var(--player-text-primary)',
        textVariant: 'caption',
      }}
      padding={[1, 2]}
      borderRadius={[2]}
      hasBorder={false}
    />
  </RowFlexContainer>
);
