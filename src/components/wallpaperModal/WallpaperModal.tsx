import React, { FC, useEffect, useMemo, useState } from 'react';
import { ColumnFlexContainer, RowFlexContainer } from '../uiComponents/container/Container';
import { useResponsive } from '@/hooks/useResponsive';
import type { WallpaperCategory } from '@/constants/wallpapers';
import { rusticWallpaperIds, nostalgicWallpaperIds } from '@/constants/wallpapers';
import { WallpaperIcon } from 'lucide-react';
import { Typography } from '../uiComponents/typography/Typography';
import { Button } from '../uiComponents/button/Button';
import { useWallpaper } from '@/hooks/useWallpaper';
import { PreviewContent } from './previewContent/PreviewContent';
import { OverviewContent } from './overviewContent/OverviewContent';
import { percentToHex } from '@/utils/formatter';
import { useWallpaperStore, type WallpaperPosition } from '@/store/wallpaperStore';

export type ViewType = 'theme' | 'time' | 'playlist';

type WallpaperModalProps = {
  onCancel: () => void;
};

export const WallpaperModal: FC<WallpaperModalProps> = ({ onCancel }) => {
  const { isMobile } = useResponsive();
  const {
    isLightMode,
    wallpaper: currentWallpaper,
    wallpapers,
    wallpaperPosition: currentWallpaperPosition,
    setWallpaper,
    setWallpaperPosition,
  } = useWallpaper();
  const wallpaperPositions = useWallpaperStore((state) => state.wallpaperPositions);

  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
  const [hoveredWallpaperId, setHoveredWallpaperId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeCategory, setActiveCategory] = useState<WallpaperCategory>(
    rusticWallpaperIds.has(currentWallpaper.id)
      ? 'Rustic'
      : nostalgicWallpaperIds.has(currentWallpaper.id)
        ? 'Nostalgic'
        : 'Nature'
  );
  const [selectedWallpaperPosition, setSelectedWallpaperPosition] =
    useState<WallpaperPosition>(currentWallpaperPosition);

  useEffect(() => {
    setSelectedWallpaperPosition(wallpaperPositions[selectedWallpaper.id] ?? { x: 50, y: 50 });
  }, [selectedWallpaper.id, wallpaperPositions]);

  const categories: WallpaperCategory[] = ['Nature', 'Rustic', 'Nostalgic'];

  const isInCategory = (wallpaperId: string, category: WallpaperCategory) => {
    if (category === 'Rustic') return rusticWallpaperIds.has(wallpaperId);
    if (category === 'Nostalgic') return nostalgicWallpaperIds.has(wallpaperId);
    return !rusticWallpaperIds.has(wallpaperId) && !nostalgicWallpaperIds.has(wallpaperId);
  };

  const categoryWallpapers = useMemo(
    () => wallpapers.filter((wallpaper) => isInCategory(wallpaper.id, activeCategory)),
    [activeCategory, wallpapers]
  );

  const isPositionUnchanged =
    selectedWallpaperPosition.x === currentWallpaperPosition.x &&
    selectedWallpaperPosition.y === currentWallpaperPosition.y;
  const isApplyDisabled = selectedWallpaper === currentWallpaper && isPositionUnchanged;

  const handleCategoryChange = (category: WallpaperCategory) => {
    setActiveCategory(category);
    const firstWallpaper = wallpapers.find((wallpaper) => isInCategory(wallpaper.id, category));
    if (firstWallpaper) setSelectedWallpaper(firstWallpaper);
  };

  const showPreviousPreview = () => {
    const currentIndex = categoryWallpapers.findIndex((item) => item.id === selectedWallpaper.id);
    const previousIndex =
      (currentIndex - 1 + categoryWallpapers.length) % categoryWallpapers.length;
    setSelectedWallpaper(categoryWallpapers[previousIndex]);
  };

  const showNextPreview = () => {
    const currentIndex = categoryWallpapers.findIndex((item) => item.id === selectedWallpaper.id);
    const nextIndex = (currentIndex + 1) % categoryWallpapers.length;
    setSelectedWallpaper(categoryWallpapers[nextIndex]);
  };

  const applyWallpaper = () => {
    setWallpaper(selectedWallpaper.id);
    setWallpaperPosition(selectedWallpaper.id, selectedWallpaperPosition);
    onCancel();
  };

  const previewTheme = showPreview ? selectedWallpaper.theme : currentWallpaper.theme;
  const isLightPreview = showPreview && selectedWallpaper.theme.mode === 'light';
  const previewOverlayColor = isLightPreview ? 'rgba(255, 255, 255, 0.2)' : 'var(--page-overlay)';

  const modalBackgroundColor = isLightMode
    ? percentToHex(currentWallpaper.theme.playerBackground, 85)
    : percentToHex(currentWallpaper.theme.playerBackground, 10);

  return (
    <ColumnFlexContainer
      padding={isMobile ? [6] : [4]}
      backgroundColor={isLightPreview ? 'transparent' : modalBackgroundColor}
      width={isMobile ? '90vw' : '640px'}
      height={isMobile ? '100%' : showPreview ? undefined : '480px'}
      maxHeight={isMobile || showPreview ? undefined : 'calc(100dvh - 32px)'}
      borderRadius={[2]}
      position="relative"
      style={{
        overflow: 'hidden',
        isolation: 'isolate',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--player-border)',
      }}
      gap={[2]}
    >
      {showPreview && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${selectedWallpaper.src})`,
              backgroundSize: 'cover',
              backgroundPosition: `${selectedWallpaperPosition.x}% ${selectedWallpaperPosition.y}%`,
              filter: 'blur(12px)',
              transform: 'scale(1.1)', // prevents blurred edges from showing
              zIndex: -1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: previewOverlayColor,
              zIndex: -1,
            }}
          />
        </>
      )}
      <RowFlexContainer alignItems="start" gap={isMobile ? [2] : [4]}>
        <WallpaperIcon
          size={isMobile ? '24px' : '32px'}
          style={{ marginTop: '4px', color: previewTheme.textPrimary }}
        />
        <ColumnFlexContainer>
          <Typography
            variant={isMobile ? 'button' : 'h6'}
            weight="semiBold"
            color={previewTheme.textPrimary}
          >
            {showPreview ? 'WALLPAPER PREVIEW' : 'SELECT WALLPAPER'}
          </Typography>
          <Typography variant={isMobile ? 'legal' : 'caption'} color={previewTheme.textSecondary}>
            {showPreview
              ? 'This is a preview of your selected wallpaper.'
              : 'Choose a wallpaper for your player.'}
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>

      {!showPreview && (
        <RowFlexContainer
          gap={[1]}
          // backgroundColor="var(--background-dark-transparent)"
          padding={[1]}
          borderRadius={[2]}
        >
          {categories.map((category) => (
            <Button
              key={category}
              text={category}
              size="xSmall"
              variant={activeCategory === category ? 'contained' : 'outlined'}
              textOptions={{
                textColor:
                  activeCategory === category && previewTheme.mode === 'light'
                    ? 'white'
                    : previewTheme.textPrimary,
                textVariant: 'caption',
              }}
              buttonStyles={{
                borderRadius: [2],
                bgColor:
                  activeCategory === category
                    ? 'var(--player-accent)'
                    : 'var(--background-dark-transparent)',
              }}
              onClick={() => handleCategoryChange(category)}
            />
          ))}
        </RowFlexContainer>
      )}

      {!showPreview && (
        <OverviewContent
          selectedWallpaper={selectedWallpaper}
          handleImageClick={(item) => setSelectedWallpaper(item)}
          hoveredWallpaperId={hoveredWallpaperId}
          setHoveredWallpaperId={setHoveredWallpaperId}
          wallpapersList={categoryWallpapers}
          isApplyDisabled={isApplyDisabled}
          handleShowPreview={() => setShowPreview(true)}
          onCancel={onCancel}
          handleApply={applyWallpaper}
        />
      )}

      {showPreview && (
        <PreviewContent
          selectedWallpaper={selectedWallpaper}
          wallpaperPosition={selectedWallpaperPosition}
          onWallpaperPositionChange={setSelectedWallpaperPosition}
          isApplyDisabled={isApplyDisabled}
          wallpapersItems={categoryWallpapers}
          handleBackButtonClick={() => setShowPreview(false)}
          handleApply={applyWallpaper}
          handleNextPreview={showNextPreview}
          handlePreviousPreview={showPreviousPreview}
        />
      )}
    </ColumnFlexContainer>
  );
};
