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
  muted: '#6f6b61',
  border: '#d8cfbf',
  border2: '#68212399',
  accent: '#bc6c38',
  accentTransparent: percentToHex('#ffffff', 70),
  borderGray: '#d8cfbf',
  divider: '#d8cfbf',
  cardShadow: '0 4px 12px rgba(0,0,0,0.08)',
} as const;

export type Colors = keyof typeof colorPalette;
