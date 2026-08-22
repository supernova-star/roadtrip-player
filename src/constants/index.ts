export const APP_NAME = 'Roadtrip Player';

export const PERCENTAGE_OPTIONS = Array.from({ length: 11 }, (_, index) => index * 10);
export const MOBILE_BLUR_OPTIONS = Array.from({ length: 10 }, (_, index) => (index + 1) * 10);

export const CLOCK_DATE_FORMATS = {
  long: 'do MMMM yyyy',
  numeric: 'dd/MM/yyyy',
  short: 'dd MMM, yyyy',
} as const;

export const DATE_FORMAT_OPTIONS = [
  { label: '10th January 2026', value: 'long' },
  { label: '10/01/2026', value: 'numeric' },
  { label: '10 Jan, 2026', value: 'short' },
] as const;

const VITE_CLOUDINARY_CLOUD_NAME = 'd7qqd4mn';
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
