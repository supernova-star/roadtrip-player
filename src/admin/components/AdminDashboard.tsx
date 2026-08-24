import React from 'react';
import { ListMusic, Music2, Plus } from 'lucide-react';
import { Button } from '@/components/uiComponents/button/Button';
import {
  ColumnFlexContainer,
  Container,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { playlists } from '@/constants/playlists';
import { songs } from '@/constants/songs';
import { colorPalette } from '@/theme/colors';

const statistics = [
  { label: 'Total Songs', value: songs.length.toLocaleString(), icon: Music2 },
  {
    label: 'Playlists',
    value: playlists.length.toLocaleString(),
    icon: ListMusic,
  },
];

type AdminDashboardProps = {
  onSearchSongs: () => void;
};

export const AdminDashboard = ({ onSearchSongs }: AdminDashboardProps) => (
  <ColumnFlexContainer gap={[7]}>
    <ColumnFlexContainer gap={[1]}>
      <Typography variant="h4" weight="bold" color="adminDarkBrown">
        Hello, Admin
      </Typography>
      <Typography variant="body2" color="adminMuted" sx={{ lineHeight: 1.6 }}>
        Your library is looking good. Here is a quick look at what is new.
      </Typography>
    </ColumnFlexContainer>

    <RowFlexContainer flexWrap="wrap" gap={[3]}>
      {statistics.map(({ label, value, icon: Icon }) => (
        <Container
          key={label}
          flex={1}
          minWidth="135px"
          padding={[4]}
          borderRadius={[2]}
          backgroundColor="adminSurface"
          sx={{
            flex: '1 1 calc(50% - 6px)',
            border: `1px solid ${colorPalette.adminBorder}`,
          }}
        >
          <RowFlexContainer alignItems="center" justifyContent="between">
            <Typography variant="caption" weight="bold" color="adminMuted">
              {label}
            </Typography>
            <Icon size={17} color={colorPalette.adminYellow} />
          </RowFlexContainer>
          <Typography
            variant="h5"
            weight="bold"
            color="adminDarkBrown"
            sx={{ mt: 1 }}
          >
            {value}
          </Typography>
        </Container>
      ))}
    </RowFlexContainer>

    <ColumnFlexContainer gap={[3]}>
      <Typography variant="h6" weight="bold" color="adminDarkBrown">
        Quick Actions
      </Typography>
      <Button
        text="Find a song to add"
        fullWidth
        iconOptions={{ icon: Plus }}
        textOptions={{ textWeight: 'bold' }}
        onClick={onSearchSongs}
        buttonStyles={{
          bgColor: 'adminYellow',
          borderRadius: [2],
          width: 'fullWidth',
        }}
        sx={{ boxShadow: 'none' }}
      />
    </ColumnFlexContainer>
  </ColumnFlexContainer>
);
