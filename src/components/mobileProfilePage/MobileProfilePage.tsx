import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Input } from '@mui/material';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import { useWallpaper } from '@/hooks/useWallpaper';
import { useFavoritesStore } from '@/store/favoritesStore';
import { usePlayerStore } from '@/store/playerStore';
import { useUserProfileStore } from '@/store/userProfileStore';
import { percentToHex } from '@/utils/formatter';
import { AppInfoCard } from './AppInfoCard';
import { CurrentPlaylistCard } from './CurrentPlaylistCard';
import { ProfileLibrarySection } from './ProfileLibrarySection';
import { ProfileTextButton } from './ProfileTextButton';

export const MobileProfilePage: React.FC = () => {
  const userName = useUserProfileStore((state) => state.userName);
  const setUserName = useUserProfileStore((state) => state.setUserName);
  const favoriteSongCount = useFavoritesStore(
    (state) => state.favoriteSongIds.length,
  );
  const currentPlaylistId = usePlayerStore((state) => state.currentPlaylistId);
  const isAdmin = useUserProfileStore((state) => state.isAdmin);
  const { isLightMode, wallpaper } = useWallpaper();
  const mobilePageSurface = useMobilePageSurface();
  const [showAdminPasswordInput, setShowAdminPasswordInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const displayName = userName?.trim() || 'Listener';
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(
    displayName === 'Listener' ? '' : displayName,
  );
  const trimmedDraftName = draftName.trim();
  const initial = displayName.charAt(0).toUpperCase();
  const currentPlaylist = playlists.find(
    (playlist) => playlist.id === currentPlaylistId,
  );
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
      sx={{
        padding: '32px 20px 65px',
      }}
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
                <ProfileTextButton
                  disabled={!trimmedDraftName}
                  onClick={saveName}
                >
                  Save
                </ProfileTextButton>
                <ProfileTextButton onClick={cancelEditingName}>
                  Cancel
                </ProfileTextButton>
              </RowFlexContainer>
            </>
          ) : (
            <>
              <RowFlexContainer alignItems="center" gap={[2]}>
                <Typography
                  variant="h5"
                  weight="bold"
                  color="var(--player-text-primary)"
                >
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
      <ColumnFlexContainer
        gap={[5]}
        flex={1}
        overflow="auto"
        hideScrollbar
        padding={[0, 0, 4]}
      >
        <ProfileLibrarySection
          favoriteSongCount={favoriteSongCount}
          accent={wallpaper.theme.accent}
          isLightMode={isLightMode}
        />

        <CurrentPlaylistCard
          accent={wallpaper.theme.accent}
          isLightMode={isLightMode}
          currentPlaylistTitle={
            currentPlaylist?.title ?? 'No playlist selected'
          }
          currentPlaylistSongCount={currentPlaylistSongCount}
        />

        <AppInfoCard
          accent={wallpaper.theme.accent}
          isLightMode={isLightMode}
          isAdmin={isAdmin}
          showAdminPasswordInput={showAdminPasswordInput}
          adminPassword={adminPassword}
          onToggleAdmin={() =>
            setShowAdminPasswordInput((currentValue) => !currentValue)
          }
          onPasswordChange={setAdminPassword}
        />
      </ColumnFlexContainer>
    </ColumnFlexContainer>
  );
};
