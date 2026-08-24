import { Loader2 } from 'lucide-react';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

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

export const LoadingSpinner = styled(Loader2)`
  animation: ${spin} 0.8s linear infinite;
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

export const MobileProgressTrack = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  overflow: hidden;
  background: var(--background-dark-selected);
`;

export const MobileProgressFill = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: 0 999px 999px 0;
  background: linear-gradient(
    90deg,
    var(--player-accent),
    var(--blur-text-accent)
  );
  transition: width 180ms linear;
`;
