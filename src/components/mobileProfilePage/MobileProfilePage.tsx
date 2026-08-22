import React, { useState } from 'react';
import { CassetteTape, Heart, Info, ListMusic, Music2, Pencil } from 'lucide-react';
import { Input } from '@mui/material';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useWallpaper } from '@/hooks/useWallpaper';
import { useFavoritesStore } from '@/store/favoritesStore';
import { usePlayerStore } from '@/store/playerStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { percentToHex } from '@/utils/formatter';

export const MobileProfilePage: React.FC = () => {
  const userName = useUserProfileStore((state) => state.userName);
  const setUserName = useUserProfileStore((state) => state.setUserName);
  const favoriteSongCount = useFavoritesStore((state) => state.favoriteSongIds.length);
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const { isLightMode, wallpaper } = useWallpaper();
  const mobilePageSurface = useMobilePageSurface();

  const displayName = userName?.trim() || 'Listener';
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(displayName === 'Listener' ? '' : displayName);
  const trimmedDraftName = draftName.trim();
  const initial = displayName.charAt(0).toUpperCase();
  const currentPlaylist = playlists.find((playlist) => playlist.id === currentPlaylistId);
  const currentPlaylistSongCount = currentPlaylist?.songIds.length ?? 0;

  const startEditingName = () => {
    setDraftName(displayName === 'Listener' ? '' : displayName);
    setIsEditingName(true);
  };

  const saveName = () => {
    if (!trimmedDraftName) return;
    setUserName(trimmedDraftName);
    setIsEditingName(false);
  };

  const cancelEditingName = () => {
    setDraftName(displayName === 'Listener' ? '' : displayName);
    setIsEditingName(false);
  };

  return (
    <ColumnFlexContainer
      gap={[5]}
      padding={[8, 5, 24]}
      width="100%"
      height="100vh"
      style={mobilePageSurface}
    >
      <Typography variant="h5" weight="bold" color="var(--player-text-primary)">
        Profile
      </Typography>

      <RowFlexContainer alignItems="center" gap={[4]}>
        <RowFlexContainer
          alignItems="center"
          justifyContent="center"
          width={[18]}
          height={[18]}
          style={{
            borderRadius: '18px',
            backgroundColor: percentToHex(wallpaper.theme.accent, 18),
            border: '1px solid var(--player-border)',
            flexShrink: 0,
          }}
        >
          <Typography variant="h5" weight="bold" color="var(--player-accent)">
            {initial}
          </Typography>
        </RowFlexContainer>

        <ColumnFlexContainer gap={[2]} flex={1} minWidth={[0]}>
          {isEditingName ? (
            <>
              <Input
                value={draftName}
                placeholder="Enter your name"
                inputProps={{ 'aria-label': 'Edit profile name' }}
                onChange={(event) => setDraftName(event.target.value)}
                sx={{
                  color: 'var(--player-text-primary)',
                  background: 'var(--background-dark-transparent)',
                  borderRadius: '10px',
                  padding: '2px 12px',
                  '&::before, &::after': { display: 'none' },
                  '& input': {
                    color: 'var(--player-text-primary)',
                    fontSize: '18px',
                    fontWeight: 700,
                    padding: '8px 0',
                  },
                  '& input::placeholder': {
                    color: 'var(--player-text-secondary)',
                    opacity: 0.8,
                  },
                }}
              />
              <RowFlexContainer gap={[2]} alignItems="center">
                <ProfileTextButton disabled={!trimmedDraftName} onClick={saveName}>
                  Save
                </ProfileTextButton>
                <ProfileTextButton onClick={cancelEditingName}>Cancel</ProfileTextButton>
              </RowFlexContainer>
            </>
          ) : (
            <>
              <RowFlexContainer alignItems="center" gap={[2]}>
                <Typography variant="h5" weight="bold" color="var(--player-text-primary)">
                  Hi, {displayName}
                </Typography>
                <RowFlexContainer
                  alignItems="center"
                  justifyContent="center"
                  width={[8]}
                  height={[8]}
                  cursor="pointer"
                  onClick={startEditingName}
                  style={{
                    borderRadius: '999px',
                    backgroundColor: percentToHex(wallpaper.theme.accent, 12),
                    flexShrink: 0,
                  }}
                >
                  <Pencil size="15px" color="var(--player-accent)" />
                </RowFlexContainer>
              </RowFlexContainer>
              <Typography variant="body2" color="var(--player-text-secondary)">
                Music for the road
              </Typography>
            </>
          )}
        </ColumnFlexContainer>
      </RowFlexContainer>

      <ColumnFlexContainer gap={[3]}>
        <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
          Your Library
        </Typography>

        <ColumnFlexContainer
          gap={[3]}
          padding={[3]}
          style={{
            borderRadius: '12px',
            backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
            border: '1px solid var(--player-border)',
          }}
        >
          <Container
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '1px',
              overflow: 'hidden',
              borderRadius: '10px',
              backgroundColor: 'var(--background-dark-selected)',
            }}
          >
            <ProfileStat
              icon={<ListMusic size="20px" color="var(--player-accent)" />}
              label="Playlists"
              value={playlists.length.toString()}
              accent={wallpaper.theme.accent}
            />
            <ProfileStat
              icon={<Heart size="20px" color="var(--player-accent)" fill="var(--player-accent)" />}
              label="Liked"
              value={favoriteSongCount.toString()}
              accent={wallpaper.theme.accent}
            />
            <ProfileStat
              icon={<Music2 size="20px" color="var(--player-accent)" />}
              label="Songs"
              value={songs.length.toString()}
              accent={wallpaper.theme.accent}
            />
          </Container>
        </ColumnFlexContainer>
      </ColumnFlexContainer>

      <ColumnFlexContainer gap={[3]}>
        <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
          Now Selected
        </Typography>

        <RowFlexContainer
          alignItems="center"
          gap={[4]}
          padding={[4]}
          style={{
            borderRadius: '12px',
            backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
            border: '1px solid var(--player-border)',
          }}
        >
          <RowFlexContainer
            alignItems="center"
            justifyContent="center"
            width={[14]}
            height={[14]}
            borderRadius={[3]}
            style={{
              backgroundColor: percentToHex(wallpaper.theme.accent, 12),
              flexShrink: 0,
            }}
          >
            <CassetteTape size="24px" color="var(--player-accent)" />
          </RowFlexContainer>

          <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
            <Typography variant="caption" weight="semiBold" color="var(--player-text-secondary)">
              CURRENT PLAYLIST
            </Typography>
            <Typography
              variant="body1"
              weight="bold"
              color="var(--player-text-primary)"
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {currentPlaylist?.title ?? 'No playlist selected'}
            </Typography>
            <Typography variant="caption" color="var(--player-text-secondary)">
              {currentPlaylistSongCount} {currentPlaylistSongCount === 1 ? 'song' : 'songs'}
            </Typography>
          </ColumnFlexContainer>
        </RowFlexContainer>
      </ColumnFlexContainer>

      <ColumnFlexContainer gap={[3]}>
        <Typography variant="body1" weight="semiBold" color="var(--player-text-secondary)">
          App
        </Typography>

        <ColumnFlexContainer
          gap={[3]}
          padding={[4]}
          style={{
            borderRadius: '12px',
            backgroundColor: isLightMode ? 'var(--background-transparent)' : 'var(--surface-panel)',
            border: '1px solid var(--player-border)',
          }}
        >
          <RowFlexContainer alignItems="center" gap={[3]}>
            <RowFlexContainer
              alignItems="center"
              justifyContent="center"
              width={[9]}
              height={[9]}
              borderRadius={[2]}
              style={{
                backgroundColor: percentToHex(wallpaper.theme.accent, 12),
                flexShrink: 0,
              }}
            >
              <Info size="18px" color="var(--player-accent)" />
            </RowFlexContainer>
            <Typography variant="body1" weight="semiBold" color="var(--player-text-primary)">
              About Casette
            </Typography>
          </RowFlexContainer>

          <Typography
            variant="body2"
            color="var(--player-text-secondary)"
            sx={{ lineHeight: 1.55 }}
          >
            A minimal player for roadtrip music, favorite songs, and the playlists you keep coming
            back to.
          </Typography>
        </ColumnFlexContainer>
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};

type ProfileRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
};

const ProfileStat: React.FC<ProfileRowProps> = ({ icon, label, value, accent }) => (
  <ColumnFlexContainer
    alignItems="center"
    justifyContent="center"
    gap={[1]}
    padding={[3, 1]}
    minHeight="82px"
  >
    <RowFlexContainer
      alignItems="center"
      justifyContent="center"
      width={[8]}
      height={[8]}
      style={{
        borderRadius: '10px',
        backgroundColor: percentToHex(accent, 12),
      }}
    >
      {icon}
    </RowFlexContainer>
    <Typography
      variant="caption"
      color="var(--player-text-secondary)"
      textAlign="center"
      sx={{ fontSize: '11px', lineHeight: 1.1 }}
    >
      {label}
    </Typography>
    <Typography
      variant="body1"
      weight="bold"
      color="var(--player-text-primary)"
      textAlign="center"
      sx={{ lineHeight: 1.05 }}
    >
      {value}
    </Typography>
  </ColumnFlexContainer>
);

const ProfileTextButton: React.FC<
  React.PropsWithChildren<{ disabled?: boolean; onClick: () => void }>
> = ({ children, disabled = false, onClick }) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    padding={[1, 2]}
    cursor={disabled ? 'notAllowed' : 'pointer'}
    onClick={disabled ? undefined : onClick}
    style={{
      borderRadius: '8px',
      backgroundColor: disabled ? 'var(--background-dark-transparent)' : 'var(--player-accent)',
      opacity: disabled ? 0.54 : 1,
    }}
  >
    <Typography
      variant="caption"
      weight="semiBold"
      color={disabled ? 'var(--player-text-secondary)' : 'var(--player-background)'}
    >
      {children}
    </Typography>
  </RowFlexContainer>
);
