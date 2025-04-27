import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    background: '#FFFDF9',
    beige: '#F5EBDD',
    blush: '#F8E1E7',
    gold: '#EAD7B7',
    text: '#2D2A2A',
    accent: '#E1C9A6',
  },
  fonts: {
    serif: 'Playfair Display',
    sans: 'Lato',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
