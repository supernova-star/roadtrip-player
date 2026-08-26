import React, { useState } from 'react';
import { Image, Layers, Sparkles } from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { RangeRow } from '@/components/uiComponents/settings/RangeRow';
import { ToggleRow } from '@/components/uiComponents/settings/ToggleRow';
import { MobileSettingsHeader } from '@/components/uiComponents/settings/MobileSettingsHeader';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useDisplayPreferencesStore } from '@/store/displayPreferencesStore';
import { PERCENTAGE_OPTIONS } from '@/constants';
import { SettingsGroup } from '@/components/uiComponents/settingsGroup/SettingsGroup';
import { MobileSettingsApplyButton } from './MobileSettingsApplyButton';

type MobileDisplaySettingsPageProps = {
  onBack: () => void;
};

export const MobileDisplaySettingsPage: React.FC<
  MobileDisplaySettingsPageProps
> = ({ onBack }) => {
  const blurHomeBackground = useDisplayPreferencesStore(
    (state) => state.blurHomeBackground,
  );
  const homeBackgroundBlur = useDisplayPreferencesStore(
    (state) => state.homeBackgroundBlur,
  );
  const homeOverlayIntensity = useDisplayPreferencesStore(
    (state) => state.homeOverlayIntensity,
  );
  const setBlurHomeBackground = useDisplayPreferencesStore(
    (state) => state.setBlurHomeBackground,
  );
  const setHomeBackgroundBlur = useDisplayPreferencesStore(
    (state) => state.setHomeBackgroundBlur,
  );
  const setHomeOverlayIntensity = useDisplayPreferencesStore(
    (state) => state.setHomeOverlayIntensity,
  );
  const mobilePageSurface = useMobilePageSurface();
  const [draftBlurHomeBackground, setDraftBlurHomeBackground] =
    useState(blurHomeBackground);
  const [draftHomeBackgroundBlur, setDraftHomeBackgroundBlur] =
    useState(homeBackgroundBlur);
  const [draftHomeOverlayIntensity, setDraftHomeOverlayIntensity] =
    useState(homeOverlayIntensity);

  const isApplyDisabled =
    draftBlurHomeBackground === blurHomeBackground &&
    draftHomeBackgroundBlur === homeBackgroundBlur &&
    draftHomeOverlayIntensity === homeOverlayIntensity;

  const handleApply = () => {
    if (isApplyDisabled) return;
    setBlurHomeBackground(draftBlurHomeBackground);
    setHomeBackgroundBlur(draftHomeBackgroundBlur);
    setHomeOverlayIntensity(draftHomeOverlayIntensity);
    onBack();
  };

  return (
    <ColumnFlexContainer
      gap={[5]}
      padding={[6, 5, 37]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
    >
      <MobileSettingsHeader
        title="Display"
        subtitle="Tune the Home wallpaper and overlay"
        onBack={onBack}
      />

      <ColumnFlexContainer gap={[2]} style={{ flexShrink: 0 }}>
        <Typography
          variant="caption"
          weight="semiBold"
          color="var(--player-text-secondary)"
        >
          PREVIEW
        </Typography>
        <ColumnFlexContainer
          gap={[3]}
          padding={[4]}
          style={{
            minHeight: '132px',
            borderRadius: '12px',
            backgroundImage: 'var(--roadtrip-wallpaper)',
            backgroundSize: 'cover',
            backgroundPosition: 'var(--roadtrip-wallpaper-position)',
            border: '1px solid var(--player-border)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Container
            position="absolute"
            top="0px"
            left="0px"
            right="0px"
            bottom="0px"
            sx={{
              background: 'var(--home-page-overlay)',
              backdropFilter: draftBlurHomeBackground
                ? `blur(${Math.round(draftHomeBackgroundBlur / 5)}px)`
                : 'none',
            }}
          />
          <ColumnFlexContainer gap={[1]} position="relative">
            <Typography
              variant="body1"
              weight="bold"
              color="var(--player-text-primary)"
            >
              Home background
            </Typography>
            <Typography variant="caption" color="var(--player-text-secondary)">
              Blur{' '}
              {draftBlurHomeBackground ? `${draftHomeBackgroundBlur}%` : 'off'}{' '}
              • Overlay {draftHomeOverlayIntensity}%
            </Typography>
          </ColumnFlexContainer>
        </ColumnFlexContainer>
      </ColumnFlexContainer>

      <ColumnFlexContainer
        gap={[3]}
        flex={1}
        minHeight="0px"
        overflow="auto"
        hideScrollbar
      >
        <SettingsGroup title="Home page">
          <ToggleRow
            icon={<Sparkles size="18px" color="var(--player-accent)" />}
            title="Blur wallpaper"
            subtitle="Soften the wallpaper behind the home screen"
            checked={draftBlurHomeBackground}
            onChange={setDraftBlurHomeBackground}
          />
          <Container
            height="1px"
            backgroundColor="var(--player-border)"
            opacity={0.65}
          />
          <RangeRow
            icon={<Image size="18px" color="var(--player-accent)" />}
            title="Wallpaper blur"
            subtitle="0% to 100%"
            value={draftHomeBackgroundBlur}
            options={PERCENTAGE_OPTIONS}
            disabled={!draftBlurHomeBackground}
            suffix="%"
            onChange={setDraftHomeBackgroundBlur}
          />
          <Container
            height="1px"
            backgroundColor="var(--player-border)"
            opacity={0.65}
          />
          <RangeRow
            icon={<Layers size="18px" color="var(--player-accent)" />}
            title="Home page overlay"
            subtitle="Adjust the Home page overlay"
            value={draftHomeOverlayIntensity}
            options={PERCENTAGE_OPTIONS}
            suffix="%"
            onChange={setDraftHomeOverlayIntensity}
          />
        </SettingsGroup>
      </ColumnFlexContainer>
      <MobileSettingsApplyButton
        disabled={isApplyDisabled}
        onClick={handleApply}
      />
    </ColumnFlexContainer>
  );
};
