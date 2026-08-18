import { PlayerTheme } from './themeTypes';

export const playerThemes: Record<string, PlayerTheme> = {
  sunset: {
    playerBackground: '#35151F',
    playerBorder: '#713342',
    accent: '#BC6C38',
    textPrimary: '#F8F1E8',
    textSecondary: '#CDB9B4',
    textDisabled: '#77656A',
  },
  purpleNight: {
    playerBackground: '#21152B',
    playerBorder: '#6B3E72',
    accent: '#E45A8A',
    textPrimary: '#F7EEF5',
    textSecondary: '#C9B8C9',
    textDisabled: '#756878',
  },
  vintageForest: {
    playerBackground: '#182421',
    playerBorder: '#52645B',
    accent: '#C28A52',
    textPrimary: '#F4F0E3',
    textSecondary: '#C2C4AE',
    textDisabled: '#737A6D',
  },
  mountainBlue: {
    playerBackground: '#172432',
    playerBorder: '#526579',
    accent: '#BC6C38',
    textPrimary: '#F4F0E7',
    textSecondary: '#B9C0C5',
    textDisabled: '#68747D',
  },
  kolkataTaxiTheme: {
    playerBackground: '#172126',
    playerBorder: '#53615F',

    accent: '#D58A3A',

    textPrimary: '#F7F0E4',
    textSecondary: '#C7C0B2',
    textDisabled: '#72736D',
  },
  lakesideNightTheme: {
    playerBackground: '#101A32',
    playerBorder: '#435477',

    accent: '#D99A55',

    textPrimary: '#F3F1E8',
    textSecondary: '#B9C1D2',
    textDisabled: '#626C80',
  },
};
