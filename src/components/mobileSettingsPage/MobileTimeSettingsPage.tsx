import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, Clock3, MousePointerClick } from 'lucide-react';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { Switch } from '@/components/uiComponents/switch/Switch';
import { Dropdown } from '@/components/uiComponents/dropdown/Dropdown';
import { AnalogClock } from '@/components/uiComponents/analogClock/AnalogClock';
import {
  useTimeStore,
  type ClockPosition,
  type ClockSize,
  type TimeFormat,
} from '@/store/timeStore';

type MobileTimeSettingsPageProps = {
  onBack: () => void;
};

export const MobileTimeSettingsPage: React.FC<MobileTimeSettingsPageProps> = ({ onBack }) => {
  const stored = useTimeStore();
  const [timeFormat, setTimeFormat] = useState<TimeFormat>(stored.timeFormat);
  const [showAmPm, setShowAmPm] = useState(stored.showAmPm);
  const [showSeconds, setShowSeconds] = useState(stored.showSeconds);
  const [clockSize, setClockSize] = useState<ClockSize>(stored.clockSize);
  const [clockPosition, setClockPosition] = useState<ClockPosition>(stored.clockPosition);
  const [showAnalogClock, setShowAnalogClock] = useState(stored.showAnalogClock);

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
            Clock & Time
          </Typography>
          <Typography variant="caption" color="var(--player-text-secondary)">
            Set up your player clock
          </Typography>
        </ColumnFlexContainer>
      </RowFlexContainer>

      <ClockPreview
        timeFormat={timeFormat}
        showAmPm={showAmPm}
        showSeconds={showSeconds}
        clockSize={clockSize}
        clockPosition={clockPosition}
        showAnalogClock={showAnalogClock}
      />

      <ColumnFlexContainer gap={[3]} flex={1} minHeight="0px" overflow="auto" hideScrollbar>
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
        <Typography variant="body2" weight="semiBold" color="var(--player-background)">
          Apply Settings
        </Typography>
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};

const ClockPreview: React.FC<{
  timeFormat: TimeFormat;
  showAmPm: boolean;
  showSeconds: boolean;
  clockSize: ClockSize;
  clockPosition: ClockPosition;
  showAnalogClock: boolean;
}> = ({ timeFormat, showAmPm, showSeconds, clockSize, clockPosition, showAnalogClock }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = format(
    currentTime,
    `${timeFormat === '12-hour' ? 'hh' : 'HH'}:mm${showSeconds ? ':ss' : ''}${
      timeFormat === '12-hour' && showAmPm ? ' aa' : ''
    }`
  );
  const justifyContent =
    clockPosition === 'left' ? 'start' : clockPosition === 'right' ? 'end' : 'center';

  return (
    <ColumnFlexContainer gap={[2]} style={{ flexShrink: 0 }}>
      <Typography variant="caption" weight="semiBold" color="var(--player-text-secondary)">
        PREVIEW
      </Typography>
      <RowFlexContainer
        alignItems="center"
        justifyContent={showAnalogClock ? 'center' : justifyContent}
        padding={[4]}
        style={{
          minHeight: '132px',
          borderRadius: '12px',
          backgroundColor: 'var(--background-dark-transparent)',
          border: '1px solid var(--player-border)',
        }}
      >
        {showAnalogClock ? (
          <AnalogClock
            value={currentTime}
            scale={clockSize === 'large' ? 0.65 : clockSize === 'medium' ? 0.5 : 0.4}
            showSeconds={showSeconds}
          />
        ) : (
          <Typography
            variant={clockSize === 'large' ? 'h4' : clockSize === 'medium' ? 'h6' : 'body1'}
            weight="semiBold"
            color="var(--player-text-primary)"
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {formattedTime}
          </Typography>
        )}
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};

const SettingsSection: React.FC<React.PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <ColumnFlexContainer gap={[2]}>
    <Typography variant="body2" weight="semiBold" color="var(--player-text-secondary)">
      {title}
    </Typography>
    {children}
  </ColumnFlexContainer>
);

const Segment: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
  label,
  active,
  onClick,
}) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="center"
    flex={1}
    padding={[3]}
    cursor="pointer"
    onClick={onClick}
    style={{
      borderRadius: '8px',
      backgroundColor: active ? 'var(--surface-selected)' : 'var(--background-dark-transparent)',
      border: `1px solid ${active ? 'var(--player-accent)' : 'var(--player-border)'}`,
    }}
  >
    <Typography
      variant="body2"
      weight="semiBold"
      color={active ? 'var(--player-accent)' : 'var(--player-text-secondary)'}
    >
      {label}
    </Typography>
  </RowFlexContainer>
);

const SettingToggle: React.FC<{
  title: string;
  subtitle?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ title, subtitle, checked, disabled, onChange }) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="between"
    gap={[3]}
    padding={[3]}
    style={{
      borderRadius: '8px',
      backgroundColor: 'var(--background-dark-transparent)',
      border: '1px solid var(--player-border)',
      opacity: disabled ? 0.55 : 1,
    }}
  >
    <ColumnFlexContainer gap={[1]} flex={1} minWidth={[0]}>
      <Typography variant="body2" weight="semiBold" color="var(--player-text-primary)">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="var(--player-text-secondary)">
          {subtitle}
        </Typography>
      )}
    </ColumnFlexContainer>
    <Switch size="small" checked={checked} disabled={disabled} onChange={onChange} />
  </RowFlexContainer>
);

const SelectRow: React.FC<{
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
  <RowFlexContainer
    alignItems="center"
    justifyContent="between"
    gap={[3]}
    padding={[2, 3]}
    style={{
      borderRadius: '8px',
      backgroundColor: 'var(--background-dark-transparent)',
      border: '1px solid var(--player-border)',
    }}
  >
    <Typography variant="body2" weight="semiBold" color="var(--player-text-primary)">
      {label}
    </Typography>
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      size="small"
      textOptions={{ textColor: 'var(--player-text-primary)', textVariant: 'caption' }}
      padding={[1, 2]}
      borderRadius={[2]}
      hasBorder={false}
    />
  </RowFlexContainer>
);
