import React, { FC } from 'react';
import {
  Container,
  ColumnFlexContainer,
  Divider,
  RowFlexContainer,
} from '../../uiComponents/container/Container';
import { useResponsive } from '@/hooks/useResponsive';
import {
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  SmilePlus,
  Palette,
} from 'lucide-react';
import { Typography } from '../../uiComponents/typography/Typography';
import { Button } from '../../uiComponents/button/Button';
import { Stepper } from '../../uiComponents/stepper/Stepper';
import { Wallpaper } from '@/constants/wallpapers';
import type { WallpaperPosition } from '@/store/wallpaperStore';

type PreviewContentProps = {
  selectedWallpaper: Wallpaper;
  wallpaperPosition: WallpaperPosition;
  onWallpaperPositionChange: (position: WallpaperPosition) => void;
  isApplyDisabled: boolean;
  wallpapersItems: Wallpaper[];
  handleBackButtonClick: () => void;
  handleApply: () => void;
  handleNextPreview: () => void;
  handlePreviousPreview: () => void;
};

export const PreviewContent: FC<PreviewContentProps> = ({
  selectedWallpaper,
  wallpaperPosition,
  onWallpaperPositionChange,
  isApplyDisabled,
  wallpapersItems,
  handleBackButtonClick,
  handleApply,
  handleNextPreview,
  handlePreviousPreview,
}) => {
  const { isMobile } = useResponsive();
  const previewTheme = selectedWallpaper.theme;
  const isLightPreview = previewTheme.mode === 'light';
  const currentTime = new Date();
  const currentTimeText = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <ColumnFlexContainer>
      <Button
        text="Back"
        size="xSmall"
        variant="text"
        textOptions={{
          textColor: previewTheme.textPrimary,
          textVariant: isMobile ? 'caption' : 'button',
        }}
        iconOptions={{
          icon: ArrowLeft,
          iconPosition: 'start',
          iconColor: previewTheme.textPrimary,
        }}
        buttonStyles={{
          bgColor: 'accent',
          borderRadius: [2],
        }}
        onClick={handleBackButtonClick}
      />

      <Container display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={[3]}>
        <RowFlexContainer
          width={isMobile ? '160px' : [80]}
          height={isMobile ? '280px' : [48]}
          margin={[2, 0, 0]}
          position="relative"
          style={{
            alignSelf: 'center',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: isLightPreview ? '0 12px 30px rgba(75, 95, 100, 0.18)' : undefined,
          }}
        >
          <div
            role="img"
            aria-label={selectedWallpaper.name}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${selectedWallpaper.src})`,
              backgroundSize: 'cover',
              backgroundPosition: `${wallpaperPosition.x}% ${wallpaperPosition.y}%`,
              backgroundRepeat: 'no-repeat',
              borderRadius: '8px',
              border: `2px solid var(--player-border)`,
            }}
          />
          <Typography
            variant={isMobile ? 'subtitle1' : 'h4'}
            weight="semiBold"
            color={previewTheme.textPrimary}
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {currentTimeText}
          </Typography>
        </RowFlexContainer>

        <ColumnFlexContainer gap={[2]} flex={1} padding={isMobile ? [2, 1] : [3]}>
          <Typography variant="h6" weight="semiBold" color={previewTheme.textPrimary}>
            {selectedWallpaper.name}
          </Typography>
          <RowFlexContainer>
            <SmilePlus
              size={'16px'}
              style={{ color: previewTheme.textSecondary, margin: '6px 8px 0 0' }}
            />
            <ColumnFlexContainer gap={[2]} margin={[1, 0]}>
              <Typography variant="body2" color={previewTheme.textSecondary} weight="semiBold">
                Mood
              </Typography>
              <Typography variant="body2" weight="semiBold" color={previewTheme.textPrimary}>
                {selectedWallpaper.mood}
              </Typography>
            </ColumnFlexContainer>
          </RowFlexContainer>
          <Divider backgroundColor={previewTheme.playerBorder} />
          <RowFlexContainer>
            <Palette
              size={'16px'}
              style={{ color: previewTheme.textSecondary, margin: '6px 8px 0 0' }}
            />
            <ColumnFlexContainer gap={[2]} margin={[1, 0]}>
              <Typography variant="body2" color={previewTheme.textSecondary} weight="semiBold">
                Primary Colors
              </Typography>
              <RowFlexContainer gap={[1]}>
                {Object.entries(selectedWallpaper.theme)
                  .filter(([key]) => key !== 'mode')
                  .map(([, color], index) => (
                    <Container
                      key={index}
                      width={[5]}
                      height={[5]}
                      borderRadius={[4]}
                      backgroundColor={color}
                      style={{
                        border: `2px solid ${previewTheme.playerBorder}`,
                      }}
                    />
                  ))}
              </RowFlexContainer>
            </ColumnFlexContainer>
          </RowFlexContainer>

          <Button
            text="Apply"
            size="xSmall"
            variant={isMobile ? 'text' : 'contained'}
            textOptions={{
              textColor: isApplyDisabled
                ? previewTheme.textDisabled
                : isMobile
                  ? previewTheme.accent
                  : previewTheme.textPrimary,
              textWeight: 'semiBold',
              textVariant: isMobile ? 'caption' : 'button',
            }}
            iconOptions={{
              icon: MousePointerClick,
              iconPosition: 'start',
              iconColor: isApplyDisabled
                ? previewTheme.textDisabled
                : isMobile
                  ? previewTheme.accent
                  : previewTheme.textPrimary,
            }}
            buttonStyles={{
              bgColor: isLightPreview ? previewTheme.playerBackground : previewTheme.accent,
              borderRadius: [2],
              width: 'fullWidth',
            }}
            sx={
              isLightPreview
                ? {
                    border: `1px solid ${previewTheme.playerBorder}`,
                    backgroundColor: 'rgba(255,255,255,0.58)',
                  }
                : undefined
            }
            disabled={isApplyDisabled}
            onClick={handleApply}
          />
        </ColumnFlexContainer>
      </Container>

      {isMobile && (
        <ColumnFlexContainer
          gap={[1]}
          padding={[2]}
          borderRadius={[2]}
          backgroundColor="var(--background-dark-transparent)"
        >
          <Typography variant="caption" weight="semiBold" color={previewTheme.textPrimary}>
            ADJUST MOBILE CROP
          </Typography>
          <Typography variant="legal" color={previewTheme.textSecondary}>
            Move the slider to choose which horizontal section stays visible behind the player.
          </Typography>
          <label>
            <Typography variant="legal" color={previewTheme.textSecondary}>
              Horizontal
            </Typography>
            <input
              type="range"
              min="0"
              max="100"
              value={wallpaperPosition.x}
              onChange={(event) =>
                onWallpaperPositionChange({
                  ...wallpaperPosition,
                  x: Number(event.target.value),
                })
              }
              style={{ width: '100%', accentColor: previewTheme.accent }}
            />
          </label>
        </ColumnFlexContainer>
      )}

      <RowFlexContainer
        width="100%"
        justifyContent="between"
        alignItems="center"
        margin={[4, 0, 0]}
      >
        <Button
          text={isMobile ? '' : 'Previous'}
          size={isMobile ? 'xSmall' : 'small'}
          variant="outlined"
          textOptions={{
            textColor: previewTheme.textPrimary,
            textVariant: isMobile ? 'caption' : 'subtitle1',
          }}
          iconOptions={{
            icon: ChevronLeft,
            iconPosition: 'start',
            iconColor: previewTheme.textPrimary,
          }}
          buttonStyles={{
            bgColor: previewTheme.playerBorder,
            borderRadius: [2],
          }}
          sx={
            isLightPreview
              ? {
                  backgroundColor: 'rgba(255,255,255,0.52)',
                }
              : undefined
          }
          onClick={handlePreviousPreview}
          disabled={selectedWallpaper.id === wallpapersItems[0].id}
        />

        <Stepper
          steps={wallpapersItems.length}
          selectedStep={wallpapersItems.findIndex((w) => w.id === selectedWallpaper.id)}
        />
        <Button
          text={isMobile ? '' : 'Next'}
          size={isMobile ? 'xSmall' : 'small'}
          variant="outlined"
          textOptions={{
            textColor: previewTheme.textPrimary,
            textVariant: isMobile ? 'caption' : 'subtitle1',
          }}
          iconOptions={{
            icon: ChevronRight,
            iconPosition: 'end',
            iconColor: previewTheme.textPrimary,
          }}
          buttonStyles={{
            bgColor: previewTheme.playerBorder,
            borderRadius: [2],
          }}
          sx={
            isLightPreview
              ? {
                  backgroundColor: 'rgba(255,255,255,0.52)',
                }
              : undefined
          }
          onClick={handleNextPreview}
          disabled={selectedWallpaper.id === wallpapersItems[wallpapersItems.length - 1].id}
        />
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
