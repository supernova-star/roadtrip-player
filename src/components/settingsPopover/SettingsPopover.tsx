import React from 'react';
import {
  ColumnFlexContainer,
  Divider,
  RowFlexContainer,
} from '../uiComponents/container/Container';
import { Clock, ListMusic, Wallpaper } from 'lucide-react';
import { Typography } from '../uiComponents/typography/Typography';
import { ViewType } from '../wallpaperModal/WallpaperModal';

export const SettingsPopover = ({
  handleSelect,
}: {
  handleSelect: (selectedItem: ViewType) => void;
}) => {
  const handleClick = (item: ViewType) => {
    handleSelect(item);
  };

  return (
    <ColumnFlexContainer
      backgroundColor="var(--surface-panel-strong)"
      width={[50]}
      padding={[4]}
      borderRadius={[2]}
      style={{
        border: '1px solid var(--player-border)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <RowFlexContainer
        alignItems="center"
        gap={[2]}
        cursor="pointer"
        padding={[2, 0]}
        onClick={() => handleClick('theme')}
      >
        <Wallpaper size="16px" color="var(--player-text-primary)" />
        <Typography variant="body2" color="var(--player-text-primary)">
          Update theme
        </Typography>
      </RowFlexContainer>
      <Divider backgroundColor="var(--player-border)" />
      <RowFlexContainer
        alignItems="center"
        gap={[2]}
        cursor="pointer"
        padding={[2, 0]}
        onClick={() => handleClick('time')}
      >
        <Clock size="16px" color="var(--player-text-primary)" />
        <Typography variant="body2" color="var(--player-text-primary)">
          Update time format
        </Typography>
      </RowFlexContainer>
      <Divider backgroundColor="var(--player-border)" />
      <RowFlexContainer
        alignItems="center"
        gap={[2]}
        cursor="pointer"
        padding={[2, 0]}
        onClick={() => handleClick('playlist')}
      >
        <ListMusic size="16px" color="var(--player-text-primary)" />
        <Typography variant="body2" color="var(--player-text-primary)">
          Choose playlist
        </Typography>
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
