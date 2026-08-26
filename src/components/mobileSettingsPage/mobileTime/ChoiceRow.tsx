import React from 'react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

export type ChoiceRowProps<Value extends string> = {
  title: string;
  options: Array<{ label: string; value: Value }>;
  value: Value;
  onChange: (value: Value) => void;
};

export const ChoiceRow = <Value extends string>({
  title,
  options,
  value,
  onChange,
}: ChoiceRowProps<Value>) => (
  <ColumnFlexContainer gap={[3]}>
    <Typography
      variant="body2"
      weight="semiBold"
      color="var(--player-text-primary)"
    >
      {title}
    </Typography>
    <ColumnFlexContainer gap={[2]}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <RowFlexContainer
            key={option.value}
            alignItems="center"
            justifyContent="between"
            padding={[2, 3]}
            borderRadius={[2]}
            cursor="pointer"
            onClick={() => onChange(option.value)}
            style={{
              backgroundColor: isActive
                ? 'var(--background-selected)'
                : 'var(--background-dark-transparent)',
              border: `1px solid ${isActive ? 'var(--player-accent)' : 'var(--player-border)'}`,
            }}
          >
            <Typography
              variant="caption"
              weight="semiBold"
              color="var(--player-text-primary)"
            >
              {option.label}
            </Typography>
            {isActive && (
              <Typography
                variant="caption"
                weight="bold"
                color="var(--player-accent)"
              >
                Selected
              </Typography>
            )}
          </RowFlexContainer>
        );
      })}
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);
