import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  ColumnFlexContainer,
  RowFlexContainer,
} from '@/components/uiComponents/container/Container';
import { Typography } from '@/components/uiComponents/typography/Typography';
import { AnalogClock } from '@/components/uiComponents/analogClock/AnalogClock';
import { CLOCK_DATE_FORMATS } from '@/constants';
import { type ClockDateFormat } from '@/store/displayPreferencesStore';
import {
  type ClockPosition,
  type ClockSize,
  type TimeFormat,
} from '@/store/timeStore';
import { formatClockTime } from '@/utils/formatter';

export const ClockPreview: React.FC<{
  timeFormat: TimeFormat;
  showAmPm: boolean;
  showSeconds: boolean;
  clockSize: ClockSize;
  clockPosition: ClockPosition;
  showAnalogClock: boolean;
  showClockCard: boolean;
  showClockDate: boolean;
  clockDateFormat: ClockDateFormat;
}> = ({
  timeFormat,
  showAmPm,
  showSeconds,
  clockSize,
  clockPosition,
  showAnalogClock,
  showClockCard,
  showClockDate,
  clockDateFormat,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = formatClockTime(currentTime, {
    timeFormat,
    showSeconds,
    showAmPm,
  });
  const formattedDate = format(
    currentTime,
    CLOCK_DATE_FORMATS[clockDateFormat],
  );
  const justifyContent =
    clockPosition === 'left'
      ? 'start'
      : clockPosition === 'right'
        ? 'end'
        : 'center';

  return (
    <ColumnFlexContainer gap={[2]} style={{ flexShrink: 0 }}>
      <Typography
        variant="caption"
        weight="semiBold"
        color="var(--player-text-secondary)"
      >
        PREVIEW
      </Typography>
      <RowFlexContainer alignItems="center" justifyContent={justifyContent}>
        {showClockCard ? (
          <ColumnFlexContainer
            alignItems="center"
            gap={showClockDate ? [2] : [0]}
            padding={[4, 6]}
            style={{
              minHeight: '132px',
              minWidth: 'min(100%, 260px)',
              borderRadius: '12px',
              background: 'var(--header-glass-background)',
              border: '1px solid var(--player-border)',
              backdropFilter: 'blur(18px) saturate(1.08)',
              boxShadow: 'var(--header-glass-shadow)',
            }}
          >
            {showClockDate && (
              <Typography
                variant="caption"
                weight="semiBold"
                color="var(--player-text-secondary)"
                sx={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                {formattedDate}
              </Typography>
            )}
            {showAnalogClock ? (
              <AnalogClock
                value={currentTime}
                scale={
                  clockSize === 'large'
                    ? 0.65
                    : clockSize === 'medium'
                      ? 0.5
                      : 0.4
                }
                showSeconds={showSeconds}
              />
            ) : (
              <Typography
                variant={
                  clockSize === 'large'
                    ? 'h4'
                    : clockSize === 'medium'
                      ? 'h6'
                      : 'body1'
                }
                weight="semiBold"
                color="var(--player-text-primary)"
                sx={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {formattedTime}
              </Typography>
            )}
          </ColumnFlexContainer>
        ) : (
          <RowFlexContainer
            alignItems="center"
            justifyContent="center"
            padding={[4]}
            width="100%"
            style={{
              minHeight: '132px',
              borderRadius: '12px',
              backgroundColor: 'var(--background-dark-transparent)',
              border: '1px dashed var(--player-border)',
            }}
          >
            <Typography variant="caption" color="var(--player-text-secondary)">
              Clock card hidden
            </Typography>
          </RowFlexContainer>
        )}
      </RowFlexContainer>
    </ColumnFlexContainer>
  );
};
