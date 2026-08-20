import React, { FC } from 'react';
import {
  Container,
  ColumnFlexContainer,
  RowFlexContainer,
} from '../../uiComponents/container/Container';
import { Button } from '../../uiComponents/button/Button';
import { X, View, MousePointerClick } from 'lucide-react';
import { useResponsive } from '@/hooks/useResponsive';
import { Wallpaper } from '@/constants/wallpapers';

type OverviewContentProps = {
  selectedWallpaper: Wallpaper;
  handleImageClick: (wallpaper: Wallpaper) => void;
  hoveredWallpaperId: string | null;
  setHoveredWallpaperId: (id: string | null) => void;
  wallpapersList: Wallpaper[];
  isApplyDisabled: boolean;
  handleShowPreview: () => void;
  onCancel: () => void;
  handleApply: () => void;
};

export const OverviewContent: FC<OverviewContentProps> = ({
  selectedWallpaper,
  handleImageClick,
  hoveredWallpaperId,
  setHoveredWallpaperId,
  wallpapersList,
  isApplyDisabled,
  handleShowPreview,
  onCancel,
  handleApply,
}) => {
  const { isMobile } = useResponsive();
  return (
    <ColumnFlexContainer flex={isMobile ? 1 : undefined} style={{ minHeight: 0 }}>
      <Container
        display="grid"
        width="100%"
        gap={[2]}
        margin={[2, 0]}
        cursor="pointer"
        flex={isMobile ? 1 : undefined}
        overflow="auto"
        alignContent="start"
        style={{
          gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))',
          gridAutoRows: 'auto',
        }}
      >
        {wallpapersList.map((item) => (
          <RowFlexContainer
            key={item.id}
            width="100%"
            height="auto"
            position="relative"
            style={{ aspectRatio: isMobile ? '1.5' : '1.7' }}
            onMouseEnter={() => setHoveredWallpaperId(item.id)}
            onMouseLeave={() => setHoveredWallpaperId(null)}
          >
            <img
              src={item.src}
              alt={item.name}

              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
                border:
                  selectedWallpaper.id === item.id ? '2px solid var(--player-border)' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(item)}
            />
            {hoveredWallpaperId === item.id && !isMobile && (
              <Container
                width="100%"
                height="100%"
                backgroundColor="background2Hover"
                position="absolute"
                borderRadius={[2]}
                style={{
                  pointerEvents: 'none',
                }}
              ></Container>
            )}
          </RowFlexContainer>
        ))}
      </Container>

      <RowFlexContainer
        width="100%"
        alignItems="center"
        justifyContent="end"
        gap={isMobile ? [0] : [3]}
      >
        <Button
          text="Cancel"
          size="xSmall"
          variant={isMobile ? 'text' : 'outlined'}
          textOptions={{
            textColor: 'var(--player-text-primary)',
            textVariant: isMobile ? 'caption' : 'button',
          }}
          iconOptions={{ icon: X, iconPosition: 'start', iconColor: 'var(--player-text-primary)' }}
          buttonStyles={{
            bgColor: 'var(--player-border)',
            borderRadius: [2],
          }}
          onClick={onCancel}
        />

        <Button
          text="Preview"
          size="xSmall"
          variant={isMobile ? 'text' : 'outlined'}
          textOptions={{
            textColor: 'var(--player-text-primary)',
            textVariant: isMobile ? 'caption' : 'button',
          }}
          iconOptions={{
            icon: View,
            iconPosition: 'start',
            iconColor: 'var(--player-text-primary)',
          }}
          buttonStyles={{
            bgColor: 'var(--player-border)',
            borderRadius: [2],
          }}
          onClick={handleShowPreview}
        />

        <Button
          text="Apply"
          size="xSmall"
          variant={isMobile ? 'text' : 'contained'}
          textOptions={{
            textColor: isApplyDisabled
              ? 'var(--player-text-disabled)'
              : isMobile
                ? 'accent'
                : 'var(--player-text-primary)',
            textWeight: 'semiBold',
            textVariant: isMobile ? 'caption' : 'button',
          }}
          iconOptions={{
            icon: MousePointerClick,
            iconPosition: 'start',
            iconColor: isApplyDisabled
              ? 'var(--player-text-disabled)'
              : isMobile
                ? 'accent'
                : 'var(--player-text-primary)',
          }}
          buttonStyles={{
            bgColor: 'var(--player-border)',
            borderRadius: [2],
          }}
          disabled={isApplyDisabled}
          onClick={handleApply}
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
