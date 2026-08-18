import React, { FC } from 'react';
import Container, { RowFlexContainer } from '../container/Container';

type StepperProps = {
  steps: number;
  selectedStep?: number;
};

export const Stepper: FC<StepperProps> = ({ steps, selectedStep = 0 }) => {
  return (
    <RowFlexContainer gap={[2]}>
      {steps > 1 &&
        Array.from({ length: steps }).map((_, index) => (
          <Container
            key={index}
            width={[2]}
            height={[2]}
            borderRadius={[4]}
            backgroundColor={index === selectedStep ? 'borderGray' : 'var(--player-accent)'}
          ></Container>
        ))}
    </RowFlexContainer>
  );
};
