import React, { useState } from 'react';
import { Clock3, ListMusic, PanelTop, Quote } from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { ToggleRow } from '@/components/uiComponents/settings/ToggleRow';
import { SettingsGroup } from '@/components/uiComponents/settingsGroup/SettingsGroup';
import { MobileSettingsHeader } from '@/components/uiComponents/settings/MobileSettingsHeader';
import { Header } from '@/components/header/Header';
import { playlists } from '@/constants/playlists';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useDisplayPreferencesStore } from '@/store/displayPreferencesStore';
import { MobileSettingsApplyButton } from './MobileSettingsApplyButton';

type MobileHeaderSettingsPageProps = {
  onBack: () => void;
};

export const MobileHeaderSettingsPage: React.FC<
  MobileHeaderSettingsPageProps
> = ({ onBack }) => {
  const showHeaderCard = useDisplayPreferencesStore(
    (state) => state.showHeaderCard,
  );
  const showHeaderNowPlaying = useDisplayPreferencesStore(
    (state) => state.showHeaderNowPlaying,
  );
  const showHeaderQuote = useDisplayPreferencesStore(
    (state) => state.showHeaderQuote,
  );
  const showHeaderClock = useDisplayPreferencesStore(
    (state) => state.showHeaderClock,
  );
  const setShowHeaderCard = useDisplayPreferencesStore(
    (state) => state.setShowHeaderCard,
  );
  const setShowHeaderNowPlaying = useDisplayPreferencesStore(
    (state) => state.setShowHeaderNowPlaying,
  );
  const setShowHeaderQuote = useDisplayPreferencesStore(
    (state) => state.setShowHeaderQuote,
  );
  const setShowHeaderClock = useDisplayPreferencesStore(
    (state) => state.setShowHeaderClock,
  );
  const mobilePageSurface = useMobilePageSurface();
  const [draftShowHeaderCard, setDraftShowHeaderCard] =
    useState(showHeaderCard);
  const [draftShowHeaderNowPlaying, setDraftShowHeaderNowPlaying] =
    useState(showHeaderNowPlaying);
  const [draftShowHeaderQuote, setDraftShowHeaderQuote] =
    useState(showHeaderQuote);
  const [draftShowHeaderClock, setDraftShowHeaderClock] =
    useState(showHeaderClock);

  const isApplyDisabled =
    draftShowHeaderCard === showHeaderCard &&
    draftShowHeaderNowPlaying === showHeaderNowPlaying &&
    draftShowHeaderQuote === showHeaderQuote &&
    draftShowHeaderClock === showHeaderClock;

  const handleApply = () => {
    if (isApplyDisabled) return;
    setShowHeaderCard(draftShowHeaderCard);
    setShowHeaderNowPlaying(draftShowHeaderNowPlaying);
    setShowHeaderQuote(draftShowHeaderQuote);
    setShowHeaderClock(draftShowHeaderClock);
    onBack();
  };

  return (
    <ColumnFlexContainer
      gap={[5]}
      padding={[6, 5, 23]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
    >
      <MobileSettingsHeader
        title="Header"
        subtitle="Control what appears in the home header"
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
        {draftShowHeaderCard ? (
          <Header
            activePlaylist={playlists[0]}
            handleClick={() => undefined}
            displayOptions={{
              showHeaderCard: draftShowHeaderCard,
              showHeaderNowPlaying: draftShowHeaderNowPlaying,
              showHeaderQuote: draftShowHeaderQuote,
              showHeaderClock: draftShowHeaderClock,
            }}
          />
        ) : (
          <RowFlexContainer
            alignItems="center"
            justifyContent="center"
            padding={[4]}
            borderRadius={[4]}
            style={{
              border: '1px dashed var(--player-border)',
              backgroundColor: 'var(--background-dark-transparent)',
            }}
          >
            <Typography variant="caption" color="var(--player-text-secondary)">
              Header hidden
            </Typography>
          </RowFlexContainer>
        )}
      </ColumnFlexContainer>

      <SettingsGroup title="Header card">
        <ToggleRow
          icon={<PanelTop size="18px" color="var(--player-accent)" />}
          title="Show header card"
          subtitle="Display the Casette glass card on home"
          checked={draftShowHeaderCard}
          onChange={setDraftShowHeaderCard}
        />
        <Container
          height="1px"
          backgroundColor="var(--player-border)"
          opacity={0.65}
        />
        <ToggleRow
          icon={<ListMusic size="18px" color="var(--player-accent)" />}
          title="Show now playing"
          subtitle="Include playlist details in the header"
          checked={draftShowHeaderNowPlaying}
          disabled={!draftShowHeaderCard}
          onChange={setDraftShowHeaderNowPlaying}
        />
        <Container
          height="1px"
          backgroundColor="var(--player-border)"
          opacity={0.65}
        />
        <ToggleRow
          icon={<Quote size="18px" color="var(--player-accent)" />}
          title="Show wallpaper detail"
          subtitle="Include wallpaper name and quote in the header"
          checked={draftShowHeaderQuote}
          disabled={!draftShowHeaderCard}
          onChange={setDraftShowHeaderQuote}
        />
        <Container
          height="1px"
          backgroundColor="var(--player-border)"
          opacity={0.65}
        />
        <ToggleRow
          icon={<Clock3 size="18px" color="var(--player-accent)" />}
          title="Show small clock"
          subtitle="Display a compact time chip in the header"
          checked={draftShowHeaderClock}
          disabled={!draftShowHeaderCard}
          onChange={setDraftShowHeaderClock}
        />
      </SettingsGroup>
      <MobileSettingsApplyButton
        disabled={isApplyDisabled}
        onClick={handleApply}
      />
    </ColumnFlexContainer>
  );
};
