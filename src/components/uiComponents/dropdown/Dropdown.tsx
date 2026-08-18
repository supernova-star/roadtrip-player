import React from 'react';
import { Select, MenuItem, FormControl, type SelectChangeEvent } from '@mui/material';
import { colorPalette } from '@/theme/colors';
import type { Spacing } from '@/theme/themeTypes';
import { getSpacing } from '@/theme/spacing';
import theme from '@/theme/theme';
import {
  Typography,
  type FontWeight,
  type TextStyle,
  type TypographyVariant,
} from '@/components/uiComponents/typography/Typography';
import type { Colors } from '@/theme/themeTypes';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownTextOptions {
  textColor?: Colors | string;
  textStyle?: TextStyle;
  textWeight?: FontWeight;
  textVariant?: TypographyVariant;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'small' | 'medium';
  borderRadius?: Spacing;
  width?: string | number;
  disabled?: boolean;
  textOptions?: DropdownTextOptions;
  hasBorder?: boolean;
  padding?: Spacing;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  size = 'small',
  borderRadius = [2],
  width = 'fit-content',
  disabled = false,
  textOptions,
  hasBorder = true,
  padding,
}) => {
  const textColor = textOptions?.textColor ?? 'surface';
  const textWeight = textOptions?.textWeight ?? 'regular';
  const textVariant = textOptions?.textVariant ?? 'body2';
  const textStyle = textOptions?.textStyle ?? 'regular';
  const radius = getSpacing(borderRadius, theme.spacing);

  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

  return (
    <FormControl size={size} disabled={disabled} sx={{ width }}>
      <Select
        value={value}
        onChange={handleChange}
        sx={{
          borderRadius: radius,
          color: colorPalette.surface,
          backgroundColor: 'var(--player-background)',
          ...(padding && {
            '& .MuiSelect-select': { padding: getSpacing(padding, theme.spacing) },
          }),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? 'var(--player-border)' : 'transparent',
            borderRadius: radius,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? 'var(--player-accent)' : 'transparent',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: hasBorder ? 'var(--player-accent)' : 'transparent',
          },
          '& .MuiSelect-icon': {
            color: colorPalette.surface,
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            '& .MuiSelect-select': { WebkitTextFillColor: '#cccccc' },
            '& .MuiSelect-icon': { color: '#cccccc' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: colorPalette.border },
          },
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                backgroundColor: 'var(--player-background)',
                borderRadius: radius,
                border: hasBorder ? `1px solid var(--player-border)` : 'none',
                '& .MuiMenuItem-root': {
                  color: colorPalette.surface,
                  '&:hover': {
                    backgroundColor: 'var(--background-transparent)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'var(--background-selected)',
                  },
                },
              },
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            <Typography
              variant={textVariant}
              weight={textWeight}
              textStyle={textStyle}
              color={textColor}
            >
              {opt.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
