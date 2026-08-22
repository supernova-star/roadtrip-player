import { CLOUDINARY_BASE_URL } from '@/constants';
import { format } from 'date-fns';

type ClockTimeOptions = {
  timeFormat: '12-hour' | '24-hour';
  showSeconds: boolean;
  showAmPm: boolean;
};

export const formatClockTime = (date: Date, options: ClockTimeOptions) => {
  const hourFormat = options.timeFormat === '12-hour' ? 'hh' : 'HH';
  const seconds = options.showSeconds ? ':ss' : '';
  const ampm = options.timeFormat === '12-hour' && options.showAmPm ? ' aa' : '';
  return format(date, `${hourFormat}:mm${seconds}${ampm}`);
};

export const percentToHex = (colour: string, value: number) => {
  const hex = Math.round((value / 100) * 255).toString(16);
  const opacity = hex.length > 1 ? hex : 0 + hex;
  return colour + opacity;
};

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatTotalDuration = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const wallpaperUrl = (name: string) => `${CLOUDINARY_BASE_URL}/${name}.webp`;
