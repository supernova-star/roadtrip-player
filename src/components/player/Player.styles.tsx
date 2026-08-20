import styled, { css } from 'styled-components';

const ButtonCss = css<{ $isMobile: boolean }>`
  width: ${({ theme, $isMobile }) => ($isMobile ? theme.spacing(12) : theme.spacing(12))};
  height: ${({ theme, $isMobile }) => ($isMobile ? theme.spacing(12) : theme.spacing(12))};

  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: 2px solid var(--player-accent);
  }
`;

export const ControlButton = styled.button<{ $isMobile: boolean }>`
  ${ButtonCss}
  background: #00000000;
  color: var(--player-text-primary);
  flex: 1;
`;

export const ListButton = styled.button<{ $isMobile: boolean }>`
  ${ButtonCss}
  background: #00000000;
  color: var(--blur-text-accent);
`;

export const PlayButton = styled.button`
  ${ButtonCss}
  background: var(--player-text-primary);
  color: var(--player-background);
`;

export const ProgressBar = styled.input`
  flex: 1;
  min-width: 0;
  appearance: none;
  background-color: var(--player-text-primary);
  height: ${({ theme }) => theme.spacing(1.5)};
  border-radius: 999px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--player-accent);
  }
`;
