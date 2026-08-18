import type { Spacing } from '@mui/system';

export const getSpacing = (
  spacing: [number, number?, number?, number?],
  themeSpacing: Spacing
) => {
  switch (spacing.length) {
    case 1:
    default:
      return themeSpacing(spacing[0]);
    case 2:
      return themeSpacing(spacing[0], spacing[1] as number);
    case 3:
      return themeSpacing(spacing[0], spacing[1] as number, spacing[2] as number);
    case 4:
      return themeSpacing(
        spacing[0],
        spacing[1] as number,
        spacing[2] as number,
        spacing[3] as number
      );
  }
};
