import type { Colors } from './colors';

export type Spacing = [number, number?, number?, number?];
export type ThemeColors = Colors;
export type { Colors };

export type PlayerTheme = {
  playerBackground: string;
  playerBorder: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
};
