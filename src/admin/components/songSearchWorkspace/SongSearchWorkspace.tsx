import React from 'react';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import styled from 'styled-components';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  Container,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useResponsive } from '@/hooks/useResponsive';

const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 52px;
  padding: 0 18px;
  border: 1px solid ${({ theme }) => theme.colors.adminBorder};
  border-radius: 8px;
  outline: none;
  color: ${({ theme }) => theme.colors.adminDarkBrown};
  background: ${({ theme }) => theme.colors.adminSurface};
  font: inherit;
  font-size: 0.95rem;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.adminMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.adminYellow};
    box-shadow: 0 0 0 3px rgba(215, 166, 56, 0.16);
  }
`;

const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.adminYellow};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const SongSearchWorkspace = ({ onGoHome }: { onGoHome: () => void }) => {
  const { isMobile } = useResponsive();
  return (
    <Container
      minHeight="100%"
      backgroundColor="adminBackground"
      sx={{ color: 'adminDarkBrown' }}
    >
      <ColumnFlexContainer
        maxWidth="1180px"
        padding={[5, 5, 8]}
        gap={[6]}
        sx={{ margin: '0 auto' }}
      >
        <Container display="flex" justifyContent="between" alignItems="center">
          <Button
            text="Home"
            variant="text"
            size="xSmall"
            iconOptions={{ icon: ArrowLeft, iconColor: 'adminBrown' }}
            textOptions={{ textColor: 'adminBrown', textWeight: 'semiBold' }}
            buttonStyles={{ width: 'hugContents' }}
            onClick={onGoHome}
            sx={{
              minHeight: 36,
              px: 1,
              '&:hover': { backgroundColor: 'transparent' },
            }}
          />
          <Typography
            variant="caption"
            color="adminMuted"
            sx={{ fontWeight: 600 }}
          >
            SAAVN LIBRARY
          </Typography>
        </Container>

        <ColumnFlexContainer gap={[3]}>
          <Kicker>
            <SlidersHorizontal size={14} />
            Playlist studio
          </Kicker>
          <Typography
            variant={isMobile ? 'h5' : 'h2'}
            weight="bold"
            color="adminDarkBrown"
            sx={{ maxWidth: 680 }}
          >
            Find the next song for your playlist.
          </Typography>
          <Typography
            variant={isMobile ? 'body2' : 'body1'}

            color="adminMuted"
            sx={{ maxWidth: 560, lineHeight: 1.7 }}
          >
            Search Saavn, review tracks, and curate the perfect drive soundtrack
            from one calm workspace.
          </Typography>
        </ColumnFlexContainer>

        <Container
          display="flex"
          flexDirection="column"
          gap={[4]}
          padding={[5]}
          backgroundColor="adminSurface"
          borderRadius={[2]}
          shadow
          sx={{ border: '1px solid', borderColor: 'adminBorder' }}
        >
          <Container
            display="flex"
            justifyContent="between"
            alignItems="center"
            gap={[3]}
          >
            <ColumnFlexContainer gap={[1]}>
              <Typography variant="h5" weight="semiBold" color="adminDarkBrown">
                Search songs
              </Typography>
              <Typography variant="body2" color="adminMuted">
                Search is ready for the Saavn connection.
              </Typography>
            </ColumnFlexContainer>
          </Container>
          <Container
            display="flex"
            gap={[2]}
            alignItems="center"
            sx={{ '@media (max-width: 640px)': { flexDirection: 'column' } }}
          >
            <SearchInput
              aria-label="Search Saavn songs"
              placeholder="Search by song, artist, or album"
            />
            <Button
              text="Search"
              size="medium"
              iconOptions={{ icon: Search, iconColor: 'adminDarkBrown' }}
              textOptions={{
                textColor: 'adminDarkBrown',
                textWeight: 'semiBold',
              }}
              buttonStyles={{ bgColor: 'adminYellow', width: 'hugContents' }}
              disabled
              sx={{
                minWidth: 124,
                '&.Mui-disabled': { backgroundColor: 'adminBorder' },
              }}
            />
          </Container>
        </Container>
      </ColumnFlexContainer>
    </Container>
  );
};
