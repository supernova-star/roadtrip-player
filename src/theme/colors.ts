import { percentToHex } from '@/utils/formatter';

export const colorPalette = {
  primary: '#222222',
  background: '#f6efe3',

  background2: '#37161E',
  background2Transparent: percentToHex('#37161E', 90),

  background2Hover: percentToHex('#37161E', 24),

  backgroundTransparent: percentToHex('#ffffff', 20),

  backgroundSelected: percentToHex('#ffffff', 32),

  backgroundDarkTransparent: percentToHex('#000000', 20),

  backgroundDarkSelected: percentToHex('#000000', 32),

  text: '#fff8ef',
  secondaryText: '#d8cfbf',
  white: '#ffffff',
  border: '#d8cfbf',
  accent: '#bc6c38',
  borderGray: '#d8cfbf',
  divider: '#d8cfbf',
  cardShadow: '0 4px 12px rgba(0,0,0,0.08)',

  adminBackground: '#f8f5ef',
  adminSurface: '#ffffff',
  adminBrown: '#593a28',
  adminDarkBrown: '#352319',
  adminYellow: '#d7a638',
  adminMuted: '#856f60',
  adminBorder: '#e7dbcd',
  adminShadow: '0 16px 42px rgba(89, 58, 40, 0.1)',

  adminRadialBackground:
    'radial-gradient(circle at 50% 42%, rgba(188, 108, 56, 0.16), transparent 34%), linear-gradient(145deg, rgba(23, 19, 15, 0.98), rgba(55, 22, 30, 0.96))',
} as const;

export type Colors = keyof typeof colorPalette;
