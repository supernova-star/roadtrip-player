import React, { FC, useEffect, useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { useWallpaper } from '@/hooks/useWallpaper';
import {
  Container,
  ColumnFlexContainer,
  RowFlexContainer,
} from '../uiComponents/container/Container';
import { ClockIcon } from 'lucide-react';
import { Typography } from '../uiComponents/typography/Typography';
import { Button } from '../uiComponents/button/Button';
import { Switch } from '../uiComponents/switch/Switch';
import { Dropdown } from '../uiComponents/dropdown/Dropdown';
import { AnalogClock } from '../uiComponents/analogClock/AnalogClock';
import {
  useTimeStore,
  type ClockPosition,
  type ClockSize,
  type TimeFormat,
} from '@/store/timeStore';
import { formatClockTime, percentToHex } from '@/utils/formatter';

type TimeModalProps = {
  onCancel: () => void;
};

type ClockPreviewProps = {
  showAnalogClock: boolean;
  clockPosition: ClockPosition;
  clockSize: ClockSize;
  showSeconds: boolean;
  showAmPm: boolean;
  timeFormat: TimeFormat;
  rowBackground: string;
};

const ClockPreview: FC<ClockPreviewProps> = ({
  showAnalogClock,
  clockPosition,
  clockSize,
  showSeconds,
  showAmPm,
  timeFormat,
  rowBackground,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDigitalTime = formatClockTime(currentTime, {
    timeFormat,
    showSeconds,
    showAmPm,
  });

  return (
    <RowFlexContainer
      width="100%"
      height={[42]}
      borderRadius={[1]}
      padding={[2, 4]}
      justifyContent={
        !showAnalogClock
          ? clockPosition === 'left'
            ? 'start'
            : clockPosition === 'center'
              ? 'center'
              : 'end'
          : 'center'
      }
      backgroundColor={rowBackground}
    >
      {!showAnalogClock && (
        <Typography
          variant={clockSize === 'large' ? 'h5' : clockSize === 'medium' ? 'subtitle1' : 'caption'}
          color="var(--player-text-primary)"
        >
          {formattedDigitalTime}
        </Typography>
      )}
      {showAnalogClock && (
        <AnalogClock
          value={currentTime}
          scale={clockSize === 'large' ? 0.65 : clockSize === 'medium' ? 0.5 : 0.45}
          showSeconds={showSeconds}
        />
      )}
    </RowFlexContainer>
  );
};

export const TimeModal: FC<TimeModalProps> = ({ onCancel }) => {
  const { isMobile } = useResponsive();
  const { wallpaper: currentWallpaper, isLightMode } = useWallpaper();
  const stored = useTimeStore();

  const [selectedTimeFormat, setSelectedTimeFormat] = useState<TimeFormat>(stored.timeFormat);
  const [showAmPm, setShowAmPm] = useState(stored.showAmPm);
  const [clockSize, setClockSize] = useState<ClockSize>(stored.clockSize);
  const [clockPosition, setClockPosition] = useState<ClockPosition>(stored.clockPosition);
  const [showAnalogClock, setShowAnalogClock] = useState(stored.showAnalogClock);
  const [showSeconds, setShowSeconds] = useState(stored.showSeconds);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAmPm(event.target.checked);
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowSeconds(event.target.checked);
  };

  const handleClockSizeChange = (value: string) => {
    setClockSize(value as ClockSize);
  };

  const handleClockPositionChange = (value: string) => {
    setClockPosition(value as ClockPosition);
  };

  const handleApply = () => {
    stored.applySettings({
      timeFormat: selectedTimeFormat,
      showAmPm,
      showSeconds,
      clockSize,
      clockPosition,
      showAnalogClock,
    });
    onCancel();
  };

  const isApplyDisabled =
    selectedTimeFormat === stored.timeFormat &&
    showAmPm === stored.showAmPm &&
    showSeconds === stored.showSeconds &&
    clockSize === stored.clockSize &&
    clockPosition === stored.clockPosition &&
    showAnalogClock === stored.showAnalogClock;

  const handleAnalogClockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAnalogClock(event.target.checked);
  };

  const rowBackground = isLightMode
    ? 'var(--background-dark-transparent)'
    : 'var(--background-transparent)';

  const modalBackgroundColor = isLightMode
    ? percentToHex(currentWallpaper.theme.playerBackground, 85)
    : percentToHex(currentWallpaper.theme.playerBackground, 10);

  return (
    <ColumnFlexContainer
      padding={isMobile ? [6] : [4]}
      backgroundColor={modalBackgroundColor}
      width={isMobile ? '90vw' : '640px'}
      borderRadius={[2]}
      position="relative"
      style={{
        overflow: 'hidden',
        isolation: 'isolate',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--player-border)',
      }}
      gap={[2]}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'blur(12px)',
          transform: 'scale(1.1)',
          zIndex: -1,
        }}
      />
      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--surface-chip)',
          zIndex: -1,
        }}
      /> */}
      <RowFlexContainer alignItems="start" gap={isMobile ? [2] : [4]}>
        <ClockIcon
          size={isMobile ? '24px' : '32px'}
          style={{ marginTop: '4px', color: 'var(--player-text-primary)' }}
        />

        <ColumnFlexContainer>
          <Typography
            variant={isMobile ? 'button' : 'h6'}
            weight="semiBold"
            color="var(--player-text-primary)"
          >
            TIME & CLOCK SETTINGS
          </Typography>
          <Typography variant={isMobile ? 'legal' : 'caption'} color="var(--player-text-secondary)">
            Adjust time and clock settings.
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>
      <Container display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={[3]}>
        <ColumnFlexContainer gap={[3]} width={isMobile ? '100%' : '40%'}>
          <ColumnFlexContainer gap={[2]}>
            <Typography variant="caption" weight="regular" color="var(--player-text-secondary)">
              TIME FORMAT
            </Typography>
            <RowFlexContainer alignItems="center" gap={[2]}>
              <RowFlexContainer
                flex={1}
                justifyContent="center"
                borderRadius={[1]}
                backgroundColor={
                  selectedTimeFormat === '12-hour' ? 'var(--background-selected)' : undefined
                }
                padding={[2, 1]}
                onClick={() => setSelectedTimeFormat('12-hour')}
                sx={{
                  border: `1px solid var(--player-border)`,
                  ':hover': {
                    backgroundColor: 'var(--background-transparent)',
                  },
                }}
              >
                <Typography variant="body2" color="var(--player-text-primary)" weight="semiBold">
                  12-Hour
                </Typography>
              </RowFlexContainer>
              <RowFlexContainer
                flex={1}
                justifyContent="center"
                borderRadius={[1]}
                padding={[2, 1]}
                backgroundColor={
                  selectedTimeFormat === '24-hour' ? 'var(--background-selected)' : undefined
                }
                onClick={() => setSelectedTimeFormat('24-hour')}
                sx={{
                  border: `1px solid var(--player-border)`,
                  ':hover': {
                    backgroundColor: 'var(--background-transparent)',
                  },
                }}
              >
                <Typography variant="body2" color="var(--player-text-primary)" weight="semiBold">
                  24-Hour
                </Typography>
              </RowFlexContainer>
            </RowFlexContainer>

            <RowFlexContainer
              backgroundColor={rowBackground}
              padding={[2]}
              borderRadius={[1]}
              alignItems="center"
            >
              <ColumnFlexContainer flex={1}>
                <Typography variant="caption" weight="semiBold" color="var(--player-text-primary)">
                  Show AM/PM
                </Typography>
                <Typography variant="legal" weight="regular" color="var(--player-text-secondary)">
                  Display AM or PM with time.
                </Typography>
              </ColumnFlexContainer>
              <Switch
                size="small"
                checked={showAmPm}
                onChange={handleChange}
                disabled={selectedTimeFormat !== '12-hour'}
              />
            </RowFlexContainer>
          </ColumnFlexContainer>

          <ColumnFlexContainer gap={[2]}>
            <Typography variant="caption" weight="regular" color="var(--player-text-secondary)">
              TIME APPEARANCE
            </Typography>
            <RowFlexContainer
              backgroundColor={rowBackground}
              padding={[1, 2]}
              borderRadius={[1]}
              alignItems="center"
              justifyContent="between"
            >
              <Typography variant="caption" weight="semiBold" color="var(--player-text-primary)">
                Show Seconds
              </Typography>
              <Switch size="small" checked={showSeconds} onChange={handleSecondsChange} />
            </RowFlexContainer>

            <RowFlexContainer
              backgroundColor={rowBackground}
              padding={[1, 2]}
              borderRadius={[1]}
              alignItems="center"
              justifyContent="between"
            >
              <Typography variant="caption" weight="semiBold" color="var(--player-text-primary)">
                Clock Size
              </Typography>
              <Dropdown
                options={[
                  { label: 'Small', value: 'small' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Large', value: 'large' },
                ]}
                value={clockSize}
                onChange={handleClockSizeChange}
                size="small"
                textOptions={{
                  textColor: 'var(--player-text-primary)',
                  textVariant: 'caption',
                }}
                borderRadius={[1]}
                padding={[1, 2]}
                hasBorder={false}
              />
            </RowFlexContainer>

            <RowFlexContainer
              backgroundColor={rowBackground}
              padding={[1, 2]}
              borderRadius={[1]}
              alignItems="center"
              justifyContent="between"
            >
              <Typography variant="caption" weight="semiBold" color="var(--player-text-primary)">
                Clock Position
              </Typography>
              <Dropdown
                options={[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' },
                ]}
                value={clockPosition}
                onChange={handleClockPositionChange}
                size="small"
                textOptions={{
                  textColor: 'var(--player-text-primary)',
                  textVariant: 'caption',
                }}
                borderRadius={[1]}
                padding={[1, 2]}
                hasBorder={false}
              />
            </RowFlexContainer>
          </ColumnFlexContainer>
        </ColumnFlexContainer>

        <ColumnFlexContainer gap={[2]} width={isMobile ? '100%' : '40%'} flex={1}>
          <Typography variant="caption" weight="semiBold" color="var(--player-accent)">
            PREVIEW
          </Typography>

          <RowFlexContainer
            backgroundColor={rowBackground}
            padding={[1, 2]}
            borderRadius={[1]}
            alignItems="center"
            justifyContent="between"
          >
            <Typography variant="caption" weight="semiBold" color="var(--player-text-primary)">
              Show Analog Clock
            </Typography>
            <Switch size="small" checked={showAnalogClock} onChange={handleAnalogClockChange} />
          </RowFlexContainer>
          <ClockPreview
            showAnalogClock={showAnalogClock}
            clockPosition={clockPosition}
            clockSize={clockSize}
            showSeconds={showSeconds}
            showAmPm={showAmPm}
            timeFormat={selectedTimeFormat}
            rowBackground={rowBackground}
          />
          <RowFlexContainer width="100%" justifyContent="end" gap={[2]} margin={[2, 0, 0]}>
            <Button
              text="Cancel"
              size="small"
              variant="outlined"
              textOptions={{ textColor: 'var(--player-text-primary)', textVariant: 'button' }}
              buttonStyles={{ bgColor: 'var(--player-border)', borderRadius: [2] }}
              onClick={onCancel}
            />
            <Button
              text="Apply"
              size="small"
              variant="contained"
              textOptions={{
                textColor: isApplyDisabled
                  ? 'var(--player-text-disabled)'
                  : 'var(--player-text-primary)',
                textVariant: 'button',
                textWeight: 'semiBold',
              }}
              buttonStyles={{ bgColor: 'var(--player-border)', borderRadius: [2] }}
              disabled={isApplyDisabled}
              onClick={handleApply}
            />
          </RowFlexContainer>
        </ColumnFlexContainer>
      </Container>
    </ColumnFlexContainer>
  );
};
