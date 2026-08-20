import React from 'react';
import { ChevronLeft, ListMusic, Music2, Play, SlidersHorizontal } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';

type MobilePlayerSettingsPageProps = {
  onBack: () => void;
};

export const MobilePlayerSettingsPage: React.FC<MobilePlayerSettingsPageProps> = ({ onBack }) => (
  <ColumnFlexContainer
    gap={[5]}
    padding={[6, 5, 32]}
    width="100%"
    height="100vh"
    style={{ backgroundColor: 'var(--surface-panel-strong)', backdropFilter: 'blur(24px)' }}
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
          Player
        </Typography>
        <Typography variant="caption" color="var(--player-text-secondary)">
          Player display preferences
        </Typography>
      </ColumnFlexContainer>
    </RowFlexContainer>

    <ColumnFlexContainer gap={[2]} style={{ flexShrink: 0 }}>
      <Typography variant="caption" weight="semiBold" color="var(--player-text-secondary)">
        PREVIEW
      </Typography>
      <RowFlexContainer
        alignItems="center"
        gap={[3]}
        padding={[3]}
        style={{
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
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            Now Playing
          </Typography>
          <Typography
            variant="caption"
            color="var(--player-text-secondary)"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
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
          <Play size="16px" color="var(--player-background)" fill="var(--player-background)" />
        </RowFlexContainer>
        <ListMusic size="22px" color="var(--player-accent)" />
      </RowFlexContainer>
    </ColumnFlexContainer>

    <ColumnFlexContainer gap={[3]}>
      <Typography variant="body2" weight="semiBold" color="var(--player-text-secondary)">
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
        <PreferenceRow
          title="Mini player"
          subtitle="Keep controls compact at the bottom"
          trailing="Enabled"
        />
        <div style={{ height: '1px', backgroundColor: 'var(--player-border)', opacity: 0.65 }} />
        <PreferenceRow
          title="Queue shortcut"
          subtitle="Show quick access to your playlist"
          trailing="Visible"
        />
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);

const PreferenceRow: React.FC<{ title: string; subtitle: string; trailing: string }> = ({
  title,
  subtitle,
  trailing,
}) => (
  <RowFlexContainer alignItems="center" gap={[3]} padding={[3, 4]} minHeight="70px">
    <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
      <Typography variant="body2" weight="semiBold" color="var(--player-text-primary)">
        {title}
      </Typography>
      <Typography variant="caption" color="var(--player-text-secondary)">
        {subtitle}
      </Typography>
    </ColumnFlexContainer>
    <RowFlexContainer alignItems="center" gap={[1]} style={{ flexShrink: 0 }}>
      <SlidersHorizontal size="15px" color="var(--player-accent)" />
      <Typography variant="caption" weight="semiBold" color="var(--player-accent)">
        {trailing}
      </Typography>
    </RowFlexContainer>
  </RowFlexContainer>
);
