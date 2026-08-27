import React, { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { useMobilePageSurface } from '@/hooks/useMobilePageSurface';
import {
  useDisplayPreferencesStore,
  type ClockDateFormat,
} from '@/store/displayPreferencesStore';
import {
  useTimeStore,
  type ClockPosition,
  type ClockSize,
  type TimeFormat,
} from '@/store/timeStore';
import { DATE_FORMAT_OPTIONS } from '@/constants';
import { MobileSettingsHeader } from '@/components/uiComponents/settings/MobileSettingsHeader';
import { ClockPreview } from './ClockPreview';
import { SettingsSection } from './SettingsSection';
import { Segment } from './Segment';
import { SettingToggle } from './SettingToggle';
import { SelectRow } from './SelectRow';
import { ChoiceRow } from './ChoiceRow';

type MobileTimeSettingsPageProps = {
  onBack: () => void;
};

const dateFormatOptions: Array<{ label: string; value: ClockDateFormat }> = [
  ...DATE_FORMAT_OPTIONS,
];

export const MobileTimeSettingsPage: React.FC<MobileTimeSettingsPageProps> = ({
  onBack,
}) => {
  const stored = useTimeStore();
  const [timeFormat, setTimeFormat] = useState<TimeFormat>(stored.timeFormat);
  const [showAmPm, setShowAmPm] = useState(stored.showAmPm);
  const [showSeconds, setShowSeconds] = useState(stored.showSeconds);
  const [clockSize, setClockSize] = useState<ClockSize>(stored.clockSize);
  const [clockPosition, setClockPosition] = useState<ClockPosition>(
    stored.clockPosition,
  );
  const [showAnalogClock, setShowAnalogClock] = useState(
    stored.showAnalogClock,
  );
  const showClockCard = useDisplayPreferencesStore(
    (state) => state.showClockCard,
  );
  const showClockDate = useDisplayPreferencesStore(
    (state) => state.showClockDate,
  );
  const clockDateFormat = useDisplayPreferencesStore(
    (state) => state.clockDateFormat,
  );
  const setShowClockCard = useDisplayPreferencesStore(
    (state) => state.setShowClockCard,
  );
  const setShowClockDate = useDisplayPreferencesStore(
    (state) => state.setShowClockDate,
  );
  const setClockDateFormat = useDisplayPreferencesStore(
    (state) => state.setClockDateFormat,
  );
  const mobilePageSurface = useMobilePageSurface();

  const isApplyDisabled =
    timeFormat === stored.timeFormat &&
    showAmPm === stored.showAmPm &&
    showSeconds === stored.showSeconds &&
    clockSize === stored.clockSize &&
    clockPosition === stored.clockPosition &&
    showAnalogClock === stored.showAnalogClock;

  const handleApply = () => {
    if (isApplyDisabled) return;
    stored.applySettings({
      timeFormat,
      showAmPm,
      showSeconds,
      clockSize,
      clockPosition,
      showAnalogClock,
    });
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
        title="Clock & Time"
        subtitle="Set up your player clock"
        onBack={onBack}
      />

      <ClockPreview
        timeFormat={timeFormat}
        showAmPm={showAmPm}
        showSeconds={showSeconds}
        clockSize={clockSize}
        clockPosition={clockPosition}
        showAnalogClock={showAnalogClock}
        showClockCard={showClockCard}
        showClockDate={showClockDate}
        clockDateFormat={clockDateFormat}
      />

      <ColumnFlexContainer
        gap={[3]}
        flex={1}
        minHeight="0px"
        overflow="auto"
        hideScrollbar
      >
        <SettingsSection title="Clock card">
          <SettingToggle
            title="Show clock card"
            subtitle="Display time in a glass card on the home page"
            checked={showClockCard}
            onChange={(event) => setShowClockCard(event.target.checked)}
          />
          <SettingToggle
            title="Show date"
            subtitle="Add date above the time"
            checked={showClockDate}
            disabled={!showClockCard}
            onChange={(event) => setShowClockDate(event.target.checked)}
          />
          {showClockDate && showClockCard && (
            <ChoiceRow
              title="Date style"
              options={dateFormatOptions}
              value={clockDateFormat}
              onChange={setClockDateFormat}
            />
          )}
        </SettingsSection>
        <SettingsSection title="Time format">
          <RowFlexContainer gap={[2]}>
            <Segment
              label="12-hour"
              active={timeFormat === '12-hour'}
              onClick={() => setTimeFormat('12-hour')}
            />
            <Segment
              label="24-hour"
              active={timeFormat === '24-hour'}
              onClick={() => setTimeFormat('24-hour')}
            />
          </RowFlexContainer>
          <SettingToggle
            title="Show AM/PM"
            subtitle="Display AM or PM with the time"
            checked={showAmPm}
            disabled={timeFormat !== '12-hour'}
            onChange={(event) => setShowAmPm(event.target.checked)}
          />
          <SettingToggle
            title="Show seconds"
            checked={showSeconds}
            onChange={(event) => setShowSeconds(event.target.checked)}
          />
        </SettingsSection>

        <SettingsSection title="Clock appearance">
          <SettingToggle
            title="Analog clock"
            subtitle="Use a clock face instead of digital time"
            checked={showAnalogClock}
            onChange={(event) => setShowAnalogClock(event.target.checked)}
          />
          <SelectRow
            label="Clock size"
            value={clockSize}
            options={[
              { label: 'Small', value: 'small' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' },
            ]}
            onChange={(value) => setClockSize(value as ClockSize)}
          />
          {!showAnalogClock && (
            <SelectRow
              label="Clock position"
              value={clockPosition}
              options={[
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ]}
              onChange={(value) => setClockPosition(value as ClockPosition)}
            />
          )}
        </SettingsSection>
      </ColumnFlexContainer>

      <RowFlexContainer
        alignItems="center"
        justifyContent="center"
        gap={[2]}
        padding={[3]}
        cursor={isApplyDisabled ? 'notAllowed' : 'pointer'}
        onClick={isApplyDisabled ? undefined : handleApply}
        style={{
          borderRadius: '10px',
          backgroundColor: 'var(--player-accent)',
          border: '1px solid var(--player-accent)',
          opacity: isApplyDisabled ? 0.55 : 1,
          flexShrink: 0,
        }}
      >
        <MousePointerClick size="16px" color="var(--player-background)" />
        <Typography
          variant="body2"
          weight="semiBold"
          color="var(--player-background)"
        >
          Apply Settings
        </Typography>
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
