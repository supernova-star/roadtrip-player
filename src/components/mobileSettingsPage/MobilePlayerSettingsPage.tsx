import React, { useState } from 'react';
import { Activity, ListMusic, Music2, PanelBottom, Play } from 'lucide-react';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { ToggleRow } from '@/components/uiComponents/settings/ToggleRow';
import { MobileSettingsHeader } from '@/components/uiComponents/settings/MobileSettingsHeader';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { usePlayerPreferencesStore } from '@/store/playerPreferencesStore';
import { MobileSettingsApplyButton } from './MobileSettingsApplyButton';

type MobilePlayerSettingsPageProps = {
  onBack: () => void;
};

export const MobilePlayerSettingsPage: React.FC<
  MobilePlayerSettingsPageProps
> = ({ onBack }) => <MobilePlayerSettingsContent onBack={onBack} />;

const MobilePlayerSettingsContent: React.FC<MobilePlayerSettingsPageProps> = ({
  onBack,
}) => {
  const showMiniPlayer = usePlayerPreferencesStore(
    (state) => state.showMiniPlayer,
  );
  const showQueueShortcut = usePlayerPreferencesStore(
    (state) => state.showQueueShortcut,
  );
  const showProgressBar = usePlayerPreferencesStore(
    (state) => state.showProgressBar,
  );
  const setShowMiniPlayer = usePlayerPreferencesStore(
    (state) => state.setShowMiniPlayer,
  );
  const setShowQueueShortcut = usePlayerPreferencesStore(
    (state) => state.setShowQueueShortcut,
  );
  const setShowProgressBar = usePlayerPreferencesStore(
    (state) => state.setShowProgressBar,
  );
  const mobilePageSurface = useMobilePageSurface();
  const [draftShowMiniPlayer, setDraftShowMiniPlayer] =
    useState(showMiniPlayer);
  const [draftShowQueueShortcut, setDraftShowQueueShortcut] =
    useState(showQueueShortcut);
  const [draftShowProgressBar, setDraftShowProgressBar] =
    useState(showProgressBar);

  const isApplyDisabled =
    draftShowMiniPlayer === showMiniPlayer &&
    draftShowQueueShortcut === showQueueShortcut &&
    draftShowProgressBar === showProgressBar;

  const handleApply = () => {
    if (isApplyDisabled) return;
    setShowMiniPlayer(draftShowMiniPlayer);
    setShowQueueShortcut(draftShowQueueShortcut);
    setShowProgressBar(draftShowProgressBar);
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
        title="Player"
        subtitle="Player display preferences"
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
        {draftShowMiniPlayer ? (
          <RowFlexContainer
            alignItems="center"
            gap={[3]}
            padding={[3]}
            overflow="hidden"
            sx={{
              position: 'relative',
              borderRadius: '12px',
              backgroundColor: 'var(--background-dark-transparent)',
              border: '1px solid var(--player-border)',
            }}
          >
            <RowFlexContainer
              alignItems="center"
              justifyContent="center"
              width={[13]}
              height={[13]}
              borderRadius={[3]}
              style={{
                backgroundColor: 'var(--surface-selected)',
                border: '1px solid var(--player-border)',
                flexShrink: 0,
              }}
            >
              <Music2 size="24px" color="var(--player-accent)" />
            </RowFlexContainer>
            <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
              <Typography
                variant="body2"
                weight="bold"
                color="var(--player-text-primary)"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Now Playing
              </Typography>
              <Typography
                variant="caption"
                color="var(--player-text-secondary)"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Your music, your way
              </Typography>
            </ColumnFlexContainer>
            <RowFlexContainer
              alignItems="center"
              justifyContent="center"
              width={[10]}
              height={[10]}
              style={{
                borderRadius: '999px',
                backgroundColor: 'var(--player-text-primary)',
                flexShrink: 0,
              }}
            >
              <Play
                size="16px"
                color="var(--player-background)"
                fill="var(--player-background)"
              />
            </RowFlexContainer>
            {draftShowQueueShortcut && (
              <ListMusic size="22px" color="var(--player-accent)" />
            )}
            {draftShowProgressBar && (
              <Container
                height="3px"
                position="absolute"
                left="0px"
                right="0px"
                bottom="0px"
                backgroundColor="var(--background-dark-selected)"
                overflow="hidden"
              >
                <Container
                  height="100%"
                  width="42%"
                  sx={{
                    borderRadius: '0 999px 999px 0',
                    background:
                      'linear-gradient(90deg, var(--player-accent), var(--blur-text-accent))',
                  }}
                />
              </Container>
            )}
          </RowFlexContainer>
        ) : (
          <RowFlexContainer
            alignItems="center"
            justifyContent="center"
            padding={[4]}
            style={{
              borderRadius: '12px',
              backgroundColor: 'var(--background-dark-transparent)',
              border: '1px dashed var(--player-border)',
            }}
          >
            <Typography variant="caption" color="var(--player-text-secondary)">
              Mini player hidden
            </Typography>
          </RowFlexContainer>
        )}
      </ColumnFlexContainer>

      <ColumnFlexContainer gap={[3]} flex={1}>
        <Typography
          variant="body2"
          weight="semiBold"
          color="var(--player-text-secondary)"
        >
          Player layout
        </Typography>
        <ColumnFlexContainer
          style={{
            overflow: 'hidden',
            borderRadius: '12px',
            backgroundColor: 'var(--background-dark-transparent)',
            border: '1px solid var(--player-border)',
          }}
        >
          <ToggleRow
            icon={<PanelBottom size="18px" color="var(--player-accent)" />}
            title="Mini player"
            subtitle="Keep controls compact at the bottom"
            checked={draftShowMiniPlayer}
            onChange={setDraftShowMiniPlayer}
          />
          <Container
            height="1px"
            backgroundColor="var(--player-border)"
            opacity={0.65}
          />
          <ToggleRow
            icon={<ListMusic size="18px" color="var(--player-accent)" />}
            title="Queue shortcut"
            subtitle="Show quick access to your playlist"
            checked={draftShowQueueShortcut}
            onChange={setDraftShowQueueShortcut}
          />
          <Container
            height="1px"
            backgroundColor="var(--player-border)"
            opacity={0.65}
          />
          <ToggleRow
            icon={<Activity size="18px" color="var(--player-accent)" />}
            title="Progress bar"
            subtitle="Show playback progress on the mini player"
            checked={draftShowProgressBar}
            onChange={setDraftShowProgressBar}
          />
        </ColumnFlexContainer>
      </ColumnFlexContainer>
      <MobileSettingsApplyButton
        disabled={isApplyDisabled}
        onClick={handleApply}
      />
    </ColumnFlexContainer>
  );
};
