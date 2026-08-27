import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type TimeFormat = '12-hour' | '24-hour';
export type ClockSize = 'small' | 'medium' | 'large';
export type ClockPosition = 'left' | 'center' | 'right';

export interface TimeSettings {
  timeFormat: TimeFormat;
  showAmPm: boolean;
  showSeconds: boolean;
  clockSize: ClockSize;
  clockPosition: ClockPosition;
  showAnalogClock: boolean;
}

interface TimeState extends TimeSettings {
  applySettings: (settings: TimeSettings) => void;
}

const defaultSettings: TimeSettings = {
  timeFormat: '12-hour',
  showAmPm: false,
  showSeconds: false,
  clockSize: 'medium',
  clockPosition: 'center',
  showAnalogClock: false,
};

export const useTimeStore = create<TimeState>()(
  devtools(
    persist(
      (set) => ({
        ...defaultSettings,
        applySettings: (settings) => set(settings),
      }),
      {
        name: 'roadtrip-time-settings',
      },
    ),
    { name: 'time-store' },
  ),
);
