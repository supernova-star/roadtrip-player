import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import { GlobalStyles } from './theme/GlobalStyles';
import { ThemeManager } from './components/themeManager/ThemeManager';

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ThemeManager />
      <App />
    </ThemeProvider>
  );
}

const el = document.getElementById('root')!;
createRoot(el).render(<Main />);
