import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%;min-height: 100%; }
  html {
    background: #17130f;
  }
  :root {
  /* --roadtrip-wallpaper: url('/images/roadTrip.png'); */
  --roadtrip-wallpaper: none;
  --roadtrip-wallpaper-position: 50% 50%;
  --roadtrip-wallpaper-filter: none;
  --roadtrip-wallpaper-transform: none;
  --home-page-overlay: transparent;
  --other-pages-overlay: transparent;
  --page-overlay: var(--other-pages-overlay);
}
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    color: ${({ theme }) => theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -2;

    /* background-image: url('/images/roadTrip.png'); */
    /* background-image: url('/images/roadTrip.png'); */
    background-image: var(--roadtrip-wallpaper);
    background-size: cover;
    background-position: var(--roadtrip-wallpaper-position);
    background-repeat: no-repeat;
    filter: var(--roadtrip-wallpaper-filter);
    transform: var(--roadtrip-wallpaper-transform);

    pointer-events: none;
  }

  @media (min-width: 768px) {
    body::before {
      background-position: center;
    }
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    background: var(--page-overlay);
    pointer-events: none;
  }
  a { color: inherit; text-decoration: none; }
`;
