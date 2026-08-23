import React from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { AnalogClockStyles } from './AnalogClock.styles';

type ClockScale = 'small' | 'medium' | 'large';

const clockScaleMap: Record<ClockScale, number> = {
  small: 0.6,
  medium: 1,
  large: 1.4,
};

interface AnalogClockProps {
  value: Date;
  scale?: ClockScale | number;
  showSeconds?: boolean;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({
  value,
  scale = 'medium',
  showSeconds = true,
}) => {
  const resolvedScale =
    typeof scale === 'string' ? clockScaleMap[scale] : scale;
  return (
    <>
      <AnalogClockStyles />
      <div
        style={{
          transform: `scale(${resolvedScale})`,
          transformOrigin: 'center',
        }}
      >
        <Clock
          value={value}
          size={200}
          renderNumbers
          renderSecondHand={showSeconds}
          hourHandLength={55}
          hourHandOppositeLength={12}
          hourHandWidth={5}
          minuteHandLength={75}
          minuteHandOppositeLength={12}
          minuteHandWidth={3}
          secondHandLength={85}
          secondHandOppositeLength={15}
          secondHandWidth={2}
          hourMarksLength={12}
          hourMarksWidth={3}
          minuteMarksLength={6}
          minuteMarksWidth={1}
          className="themed-clock"
        />
      </div>
    </>
  );
};
