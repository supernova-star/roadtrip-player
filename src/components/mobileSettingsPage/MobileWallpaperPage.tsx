import React, { useMemo, useState } from 'react';
import { Check, ChevronLeft, Eye, Image, MousePointerClick } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import {
  DEFAULT_WALLPAPER_POSITION,
  getWallpapersByCategory,
  isWallpaperInCategory,
  WALLPAPER_CATEGORIES,
  type WallpaperCategory,
} from '@/constants/wallpapers';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useWallpaper } from '@/hooks/useWallpaper';
import { useWallpaperStore, type WallpaperPosition } from '@/store/wallpaperStore';

type MobileWallpaperPageProps = {
  onBack: () => void;
};

export const MobileWallpaperPage: React.FC<MobileWallpaperPageProps> = ({ onBack }) => {
  const { wallpaper, wallpaperPosition, wallpapers, setWallpaper, setWallpaperPosition } =
    useWallpaper();
  const mobilePageSurface = useMobilePageSurface();
  const wallpaperPositions = useWallpaperStore((state) => state.wallpaperPositions);
  const [selectedWallpaperId, setSelectedWallpaperId] = useState(wallpaper.id);
  const [selectedWallpaperPosition, setSelectedWallpaperPosition] =
    useState<WallpaperPosition>(wallpaperPosition);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<WallpaperCategory>(() => {
    if (isWallpaperInCategory(wallpaper.id, 'Rustic')) return 'Rustic';
    if (isWallpaperInCategory(wallpaper.id, 'Nostalgic')) return 'Nostalgic';
    return 'Nature';
  });

  const categoryWallpapers = useMemo(
    () => getWallpapersByCategory(wallpapers, activeCategory),
    [activeCategory, wallpapers]
  );
  const selectedWallpaper = wallpapers.find((item) => item.id === selectedWallpaperId) ?? wallpaper;
  const isPositionUnchanged =
    selectedWallpaperPosition.x === wallpaperPosition.x &&
    selectedWallpaperPosition.y === wallpaperPosition.y;
  const isApplyDisabled = selectedWallpaperId === wallpaper.id && isPositionUnchanged;

  const handleApply = () => {
    if (isApplyDisabled) return;
    setWallpaper(selectedWallpaperId);
    setWallpaperPosition(selectedWallpaperId, selectedWallpaperPosition);
    onBack();
  };

  const selectWallpaper = (wallpaperId: string) => {
    setSelectedWallpaperId(wallpaperId);
    setSelectedWallpaperPosition(wallpaperPositions[wallpaperId] ?? DEFAULT_WALLPAPER_POSITION);
  };

  if (isPreviewOpen) {
    return (
      <MobileWallpaperPreview
        wallpaper={selectedWallpaper}
        position={selectedWallpaperPosition}
        onBack={() => setIsPreviewOpen(false)}
        onPositionChange={setSelectedWallpaperPosition}
        onApply={handleApply}
        isApplyDisabled={isApplyDisabled}
      />
    );
  }

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
            flexShrink: 0,
          }}
        >
          <ChevronLeft size="20px" color="var(--player-text-primary)" />
        </RowFlexContainer>
        <ColumnFlexContainer gap={[1]}>
          <Typography variant="h5" weight="bold" color="var(--player-text-primary)">
            Wallpaper
          </Typography>
          <Typography variant="caption" color="var(--player-text-secondary)">
            Choose a look for your player
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>

      <RowFlexContainer gap={[2]} style={{ flexShrink: 0 }}>
        {WALLPAPER_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <RowFlexContainer
              key={category}
              alignItems="center"
              justifyContent="center"
              padding={[2, 3]}
              borderRadius={[3]}
              cursor="pointer"
              backgroundColor={
                isActive ? 'var(--surface-selected)' : 'var(--background-dark-transparent)'
              }
              onClick={() => setActiveCategory(category)}
              style={{
                border: `1px solid ${isActive ? 'var(--player-accent)' : 'var(--player-border)'}`,
              }}
            >
              <Typography
                variant="caption"
                weight="semiBold"
                color={isActive ? 'var(--player-accent)' : 'var(--player-text-secondary)'}
              >
                {category}
              </Typography>
            </RowFlexContainer>
          );
        })}
      </RowFlexContainer>

      <ColumnFlexContainer gap={[3]} flex={1} minHeight="0px" overflow="auto" hideScrollbar>
        <Typography variant="body2" weight="semiBold" color="var(--player-text-secondary)">
          {activeCategory}
        </Typography>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '12px',
            paddingBottom: '8px',
          }}
        >
          {categoryWallpapers.map((item) => {
            const isSelected = item.id === selectedWallpaperId;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`Use ${item.name} wallpaper`}
                onClick={() => selectWallpaper(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') selectWallpaper(item.id);
                }}
                style={{ cursor: 'pointer', minWidth: 0 }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1.5',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    border: isSelected
                      ? '2px solid var(--player-accent)'
                      : '1px solid var(--player-border)',
                  }}
                >
                  <img
                    src={item.src}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {isSelected && (
                    <RowFlexContainer
                      alignItems="center"
                      justifyContent="center"
                      width={[7]}
                      height={[7]}
                      position="absolute"
                      style={{
                        top: '8px',
                        right: '8px',
                        borderRadius: '999px',
                        backgroundColor: 'var(--player-accent)',
                      }}
                    >
                      <Check size="14px" color="var(--player-background)" strokeWidth={3} />
                    </RowFlexContainer>
                  )}
                </div>
                <RowFlexContainer alignItems="center" gap={[2]} padding={[2, 1, 0]}>
                  <Image size="14px" color="var(--player-accent)" />
                  <Typography
                    variant="caption"
                    weight="semiBold"
                    color="var(--player-text-primary)"
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {item.name}
                  </Typography>
                </RowFlexContainer>
              </div>
            );
          })}
        </div>
      </ColumnFlexContainer>

      <RowFlexContainer gap={[3]} style={{ flexShrink: 0 }}>
        <ActionButton
          icon={<Eye size="16px" />}
          label="Preview"
          onClick={() => setIsPreviewOpen(true)}
          fill
        />
        <ActionButton
          icon={<MousePointerClick size="16px" />}
          label="Apply"
          onClick={handleApply}
          disabled={isApplyDisabled}
          primary
          fill
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
  fill?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  disabled,
  primary,
  fill,
}) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    gap={[2]}
    padding={[3]}
    flex={fill ? 1 : undefined}
    cursor={disabled ? 'notAllowed' : 'pointer'}
    onClick={disabled ? undefined : onClick}
    style={{
      borderRadius: '10px',
      backgroundColor: primary ? 'var(--player-accent)' : 'var(--background-dark-transparent)',
      border: primary ? '1px solid var(--player-accent)' : '1px solid var(--player-border)',
      opacity: disabled ? 0.55 : 1,
      flexShrink: 0,
    }}
  >
    <span
      style={{
        color: primary ? 'var(--player-background)' : 'var(--player-accent)',
        display: 'flex',
      }}
    >
      {icon}
    </span>
    <Typography
      variant="body2"
      weight="semiBold"
      color={primary ? 'var(--player-background)' : 'var(--player-accent)'}
    >
      {label}
    </Typography>
  </RowFlexContainer>
);

type MobileWallpaperPreviewProps = {
  wallpaper: (typeof import('@/constants/wallpapers').wallpapers)[number];
  position: WallpaperPosition;
  onBack: () => void;
  onPositionChange: (position: WallpaperPosition) => void;
  onApply: () => void;
  isApplyDisabled: boolean;
};

const MobileWallpaperPreview: React.FC<MobileWallpaperPreviewProps> = ({
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
          style={{ borderRadius: '999px', backgroundColor: 'var(--background-dark-transparent)' }}
        >
          <ChevronLeft size="20px" color="var(--player-text-primary)" />
        </RowFlexContainer>
        <ColumnFlexContainer gap={[1]}>
          <Typography variant="h5" weight="bold" color="var(--player-text-primary)">
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
        <Typography variant="body2" weight="semiBold" color="var(--player-text-primary)">
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
          onChange={(event) => onPositionChange({ ...position, x: Number(event.target.value) })}
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
