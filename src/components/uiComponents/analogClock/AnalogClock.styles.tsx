import { createGlobalStyle } from 'styled-components';

export const AnalogClockStyles = createGlobalStyle`
  .themed-clock {
    border: 2px solid var(--player-border) !important;
    border-radius: 50%;
    background: var(--player-background) !important;
    position: relative;
  }

  .themed-clock .react-clock__face {
    border: none !important;
    background: transparent;
  }

  .themed-clock .react-clock__mark__body {
    background-color: var(--player-text-secondary) !important;
  }

  .themed-clock .react-clock__mark__number {
    color: var(--player-text-primary) !important;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
  }

  .themed-clock .react-clock__hour-hand__body {
    background-color: var(--player-text-primary) !important;
    border-radius: 4px;
  }

  .themed-clock .react-clock__minute-hand__body {
    background-color: var(--player-text-primary) !important;
    border-radius: 4px;
  }

  .themed-clock .react-clock__second-hand__body {
    background-color: var(--player-accent) !important;
    border-radius: 2px;
  }

  .themed-clock::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background: var(--player-accent);
    border-radius: 50%;
    z-index: 10;
  }
`;
