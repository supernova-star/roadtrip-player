import React, { useState } from 'react';
import { Layers, PanelTop, Sparkles } from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useWallpaper } from '@/hooks/useWallpaper';
import { useDisplayPreferencesStore } from '@/store/displayPreferencesStore';
import { MOBILE_BLUR_OPTIONS, PERCENTAGE_OPTIONS } from '@/constants';
import { SettingsGroup } from '@/components/uiComponents/settingsGroup/SettingsGroup';
import { RangeRow } from '@/components/uiComponents/settings/RangeRow';
import { ToggleRow } from '@/components/uiComponents/settings/ToggleRow';
import { MobileSettingsHeader } from '@/components/uiComponents/settings/MobileSettingsHeader';
import { MobileSettingsApplyButton } from './MobileSettingsApplyButton';

type MobileOtherScreenSettingsPageProps = {
  onBack: () => void;
};

export const MobileOtherScreenSettingsPage: React.FC<
  MobileOtherScreenSettingsPageProps
> = ({ onBack }) => {
  const otherPagesOverlayIntensity = useDisplayPreferencesStore(
    (state) => state.otherPagesOverlayIntensity,
  );
  const useSolidMobilePageBackground = useDisplayPreferencesStore(
    (state) => state.useSolidMobilePageBackground,
  );
  const mobilePageBlur = useDisplayPreferencesStore(
    (state) => state.mobilePageBlur,
  );
  const setOtherPagesOverlayIntensity = useDisplayPreferencesStore(
    (state) => state.setOtherPagesOverlayIntensity,
  );
  const setUseSolidMobilePageBackground = useDisplayPreferencesStore(
    (state) => state.setUseSolidMobilePageBackground,
  );
  const setMobilePageBlur = useDisplayPreferencesStore(
    (state) => state.setMobilePageBlur,
  );
  const mobilePageSurface = useMobilePageSurface();
  const { isLightMode } = useWallpaper();
  const [draftOverlayIntensity, setDraftOverlayIntensity] = useState(
    otherPagesOverlayIntensity,
  );
  const [
    draftUseSolidMobilePageBackground,
    setDraftUseSolidMobilePageBackground,
  ] = useState(useSolidMobilePageBackground);
  const [draftMobilePageBlur, setDraftMobilePageBlur] =
    useState(mobilePageBlur);
  const isApplyDisabled =
    draftOverlayIntensity === otherPagesOverlayIntensity &&
    draftUseSolidMobilePageBackground === useSolidMobilePageBackground &&
    draftMobilePageBlur === mobilePageBlur;

  const handleApply = () => {
    if (isApplyDisabled) return;
    setOtherPagesOverlayIntensity(draftOverlayIntensity);
    setUseSolidMobilePageBackground(draftUseSolidMobilePageBackground);
    setMobilePageBlur(draftMobilePageBlur);
    onBack();
  };

  return (
    <ColumnFlexContainer
      gap={[5]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
      sx={{
        padding: '24px 20px 72px',
      }}
    >
      <MobileSettingsHeader
        title="Other Screen Settings"
        subtitle="Tune the overlay on every screen except Home"
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
          minHeight={[33]}
          borderRadius={[4]}
          position="relative"
          style={{
            backgroundImage: 'var(--roadtrip-wallpaper)',
            backgroundSize: 'cover',
            backgroundPosition: 'var(--roadtrip-wallpaper-position)',
            border: '1px solid var(--player-border)',
            overflow: 'hidden',
          }}
        >
          <Container
            position="absolute"
            top="0px"
            left="0px"
            right="0px"
            bottom="0px"
            sx={{
              background: isLightMode
                ? `rgba(255, 255, 255, ${draftOverlayIntensity / 100})`
                : `rgba(20, 15, 12, ${draftOverlayIntensity / 100})`,
              backdropFilter: `blur(${draftUseSolidMobilePageBackground ? 24 : draftMobilePageBlur}px)`,
            }}
          />
          <ColumnFlexContainer
            gap={[2]}
            padding={[3]}
            position="relative"
            height="100%"
            style={{
              borderRadius: '10px',
              background: draftUseSolidMobilePageBackground
                ? 'var(--surface-panel-strong)'
                : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--player-border)',
            }}
          >
            <Typography
              variant="body1"
              weight="bold"
              color="var(--player-text-primary)"
            >
              Other screen
            </Typography>
            <Typography variant="caption" color="var(--player-text-secondary)">
              Blur{' '}
              {draftUseSolidMobilePageBackground ? '24' : draftMobilePageBlur}px
              • Overlay {draftOverlayIntensity}%
            </Typography>
          </ColumnFlexContainer>
        </ColumnFlexContainer>
      </ColumnFlexContainer>

      <SettingsGroup title="Other pages">
        <ToggleRow
          icon={<PanelTop size="18px" color="var(--player-accent)" />}
          title="Solid page background"
          subtitle="Use the panel background on other pages"
          checked={draftUseSolidMobilePageBackground}
          onChange={setDraftUseSolidMobilePageBackground}
        />
        <Container
          height="1px"
          backgroundColor="var(--player-border)"
          opacity={0.65}
        />
        <RangeRow
          icon={<Sparkles size="18px" color="var(--player-accent)" />}
          title="Page background blur"
          subtitle="Used when solid background is off"
          value={draftMobilePageBlur}
          options={MOBILE_BLUR_OPTIONS}
          disabled={draftUseSolidMobilePageBackground}
          suffix="%"
          onChange={setDraftMobilePageBlur}
        />
        <Container
          height="1px"
          backgroundColor="var(--player-border)"
          opacity={0.65}
        />
        <RangeRow
          icon={<Layers size="18px" color="var(--player-accent)" />}
          title="Page overlay"
          subtitle="Used everywhere except the Home page"
          value={draftOverlayIntensity}
          options={PERCENTAGE_OPTIONS}
          suffix="%"
          onChange={setDraftOverlayIntensity}
        />
      </SettingsGroup>

      <MobileSettingsApplyButton
        disabled={isApplyDisabled}
        onClick={handleApply}
      />
    </ColumnFlexContainer>
  );
};
