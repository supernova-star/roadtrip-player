import React from 'react';
import { ChevronLeft, MousePointerClick } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import type { WallpaperPosition } from '@/store/wallpaperStore';
import { Wallpaper } from '@/constants/wallpapers';
import { ActionButton } from './ActionButton';

export type MobileWallpaperPreviewProps = {
  wallpaper: Wallpaper;
  position: WallpaperPosition;
  onBack: () => void;
  onPositionChange: (position: WallpaperPosition) => void;
  onApply: () => void;
  isApplyDisabled: boolean;
};

export const MobileWallpaperPreview: React.FC<MobileWallpaperPreviewProps> = ({
  wallpaper,
  position,
  onBack,
  onPositionChange,
  onApply,
  isApplyDisabled,
}) => {
  const mobilePageSurface = useMobilePageSurface();

  return (
    <ColumnFlexContainer
      gap={[5]}
      padding={[6, 5, 32]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
    >
      <RowFlexContainer alignItems="center" gap={[3]} style={{ flexShrink: 0 }}>
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[10]}
          height={[10]}
          cursor="pointer"
          onClick={onBack}
          style={{
            borderRadius: '999px',
            backgroundColor: 'var(--background-dark-transparent)',
          }}
        >
          <ChevronLeft size="20px" color="var(--player-text-primary)" />
        </RowFlexContainer>
        <ColumnFlexContainer gap={[1]}>
          <Typography
            variant="h5"
            weight="bold"
            color="var(--player-text-primary)"
          >
            Preview
          </Typography>
          <Typography variant="caption" color="var(--player-text-secondary)">
            {wallpaper.name}
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>

      <div
        role="img"
        aria-label={`${wallpaper.name} wallpaper preview`}
        style={{
          width: 'min(100%, 220px)',
          height: 'min(48vh, 360px)',
          minHeight: '260px',
          alignSelf: 'center',
          borderRadius: '16px',
          border: '2px solid var(--player-border)',
          backgroundImage: `url(${wallpaper.src})`,
          backgroundSize: 'cover',
          backgroundPosition: `${position.x}% ${position.y}%`,
          boxShadow: 'var(--surface-shadow)',
        }}
      />

      <ColumnFlexContainer
        gap={[2]}
        padding={[4]}
        borderRadius={[3]}
        style={{
          backgroundColor: 'var(--background-dark-transparent)',
          border: '1px solid var(--player-border)',
        }}
      >
        <Typography
          variant="body2"
          weight="semiBold"
          color="var(--player-text-primary)"
        >
          Adjust image position
        </Typography>
        <Typography variant="caption" color="var(--player-text-secondary)">
          Drag to choose the part of the image that appears behind the player.
        </Typography>
        <input
          type="range"
          min="0"
          max="100"
          value={position.x}
          aria-label="Wallpaper horizontal position"
          onChange={(event) =>
            onPositionChange({ ...position, x: Number(event.target.value) })
          }
          style={{ width: '100%', accentColor: 'var(--player-accent)' }}
        />
      </ColumnFlexContainer>

      <ActionButton
        icon={<MousePointerClick size="16px" />}
        label="Apply Wallpaper"
        onClick={onApply}
        disabled={isApplyDisabled}
        primary
      />
    </ColumnFlexContainer>
  );
};
