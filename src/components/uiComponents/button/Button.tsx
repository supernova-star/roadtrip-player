import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import { alpha, darken } from '@mui/material/styles';
import type { LucideIcon } from 'lucide-react';
import React, { forwardRef } from 'react';
import {
  Typography,
  type FontWeight,
  type TextStyle,
  type TypographyVariant,
} from '@/components/uiComponents/typography/Typography';
import { colorPalette } from '@/theme/colors';
import { getSpacing } from '@/theme/spacing';
import theme from '@/theme/theme';
import type { Colors, Spacing } from '@/theme/themeTypes';

export type ButtonSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';
export type ButtonVariant = 'contained' | 'text' | 'outlined';
export type LucideIcons = LucideIcon;

export interface ButtonIconOptions {
  icon: LucideIcons;
  iconColor?: Colors | string;
  iconPosition?: 'start' | 'end';
}

export interface ButtonTextOptions {
  textColor?: Colors | string;
  textStyle?: TextStyle;
  textWeight?: FontWeight;
  textVariant?: TypographyVariant;
}

export interface ButtonStylesOptions {
  borderRadius?: Spacing;
  width?: Spacing | 'fullWidth' | 'hugContents';
  margin?: Spacing;
  bgColor?: Colors | string;
}

export interface ButtonProps extends Omit<
  MuiButtonProps,
  'children' | 'size' | 'variant' | 'startIcon' | 'endIcon'
> {
  text: string;
  iconOptions?: ButtonIconOptions;
  size?: ButtonSize;
  textOptions?: ButtonTextOptions;
  buttonStyles?: ButtonStylesOptions;
  variant?: ButtonVariant;
  onClick?: MuiButtonProps['onClick'];
}

const buttonSizeMap: Record<ButtonSize, MuiButtonProps['size']> = {
  xSmall: 'small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xLarge: 'large',
  xxLarge: 'large',
};

const buttonSizeStylesMap: Record<ButtonSize, { px: number; py: number; minHeight: number }> = {
  xSmall: { px: 2, py: 0.75, minHeight: 36 },
  small: { px: 2.5, py: 1, minHeight: 40 },
  medium: { px: 3.5, py: 1.25, minHeight: 48 },
  large: { px: 4.5, py: 1.5, minHeight: 56 },
  xLarge: { px: 5.5, py: 1.75, minHeight: 64 },
  xxLarge: { px: 6.5, py: 2, minHeight: 72 },
};

const resolveWidth = (
  width: ButtonStylesOptions['width'] = 'hugContents',
  spacingFn: typeof theme.spacing
): string | number => {
  if (width === 'fullWidth') return '100%';
  if (width === 'hugContents') return 'fit-content';

  return getSpacing(width, spacingFn);
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      iconOptions,
      size = 'medium',
      textOptions,
      buttonStyles,
      variant = 'contained',
      fullWidth = false,
      disabled = false,
      sx,
      ...props
    },
    ref
  ) => {
    const iconColor = iconOptions?.iconColor ?? 'white';
    const iconPosition = iconOptions?.iconPosition ?? 'start';
    const textColor = textOptions?.textColor ?? (variant === 'contained' ? 'white' : 'text');
    const textStyle = textOptions?.textStyle ?? 'regular';
    const textWeight = textOptions?.textWeight ?? 'semiBold';
    const textVariant = textOptions?.textVariant ?? 'button';

    const bgColor = buttonStyles?.bgColor ?? 'primary';
    const baseColor = colorPalette[bgColor as Colors] ?? (bgColor as string);
    const isCssVar = baseColor.startsWith('var(');
    const isPrimary = bgColor === 'primary';
    const containedHoverColor = isCssVar
      ? baseColor
      : isPrimary
        ? darken(baseColor, 0.12)
        : darken(baseColor, 0.08);
    const containedActiveColor = isCssVar
      ? baseColor
      : isPrimary
        ? darken(baseColor, 0.2)
        : darken(baseColor, 0.14);
    const sizeStyles = buttonSizeStylesMap[size];

    const IconComponent = iconOptions?.icon;
    const iconNode = IconComponent ? (
      <IconComponent
        size={buttonSizeStylesMap[size].minHeight > 48 ? 18 : 16}
        color={colorPalette[iconColor as Colors] ?? (iconColor as string)}
        style={{ display: 'block' }}
      />
    ) : undefined;

    return (
      <MuiButton
        ref={ref}
        disableElevation
        size={buttonSizeMap[size]}
        variant={variant}
        startIcon={iconPosition === 'start' ? iconNode : undefined}
        endIcon={iconPosition === 'end' ? iconNode : undefined}
        disabled={disabled}
        fullWidth={fullWidth}
        sx={{
          borderRadius: buttonStyles?.borderRadius
            ? getSpacing(buttonStyles.borderRadius, theme.spacing)
            : 0,
          width: fullWidth
            ? '100%'
            : resolveWidth(buttonStyles?.width ?? 'hugContents', theme.spacing),
          ...(fullWidth && { flex: '1 1 0', minWidth: 0 }),
          ...(buttonStyles?.margin && { margin: getSpacing(buttonStyles.margin, theme.spacing) }),
          minHeight: sizeStyles.minHeight,
          px: sizeStyles.px,
          py: sizeStyles.py,
          backgroundColor: variant === 'contained' ? baseColor : 'transparent',
          color: colorPalette[textColor as Colors] ?? textColor,
          borderColor: variant === 'outlined' ? baseColor : undefined,
          transition: 'transform 140ms ease, background-color 140ms ease, box-shadow 180ms ease',
          '&:hover': {
            backgroundColor:
              variant === 'contained'
                ? containedHoverColor
                : isCssVar
                  ? baseColor
                  : alpha(baseColor, isPrimary ? 0.16 : 0.12),
            borderColor: variant === 'outlined' ? containedHoverColor : undefined,
          },
          '&:active': {
            transform: 'translateY(1px) scale(0.99)',
            backgroundColor:
              variant === 'contained'
                ? containedActiveColor
                : isCssVar
                  ? baseColor
                  : alpha(baseColor, isPrimary ? 0.24 : 0.18),
          },
          '&.Mui-focusVisible': {
            boxShadow: `0 0 0 3px ${isCssVar ? baseColor : alpha(baseColor, 0.26)}`,
          },
          '&.Mui-disabled': {
            backgroundColor: colorPalette.border,
            color: (() => {
              const c = colorPalette[textColor as Colors] ?? textColor;
              return c.startsWith('var(') ? c : alpha(c, 0.72);
            })(),
          },
          ...sx,
        }}
        {...props}
      >
        <Typography
          variant={textVariant}
          textStyle={textStyle}
          weight={textWeight}
          color={textColor}
          sx={{ textTransform: 'none' }}
        >
          {text}
        </Typography>
      </MuiButton>
    );
  }
);
