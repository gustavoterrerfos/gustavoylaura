import Head from 'next/head';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import FloatingRSVPButton from '../components/FloatingRSVPButton';

const theme = {
  colors: {
    background: '#FFFDF9',
    beige: '#F5F0E8',
    blush: '#F8E1E7',
    gold: '#D4B483',
    darkGold: '#BFA76A',
    text: '#2D2A2A',
    lightText: '#5F5F5F',
    accent: '#D4B483',
    green: '#7D8B6A',
    lightGreen: '#C8D8C8',
  },
  fonts: {
    serif: '"Playfair Display", serif',
    sans: '"Lato", "Open Sans", Arial, sans-serif',
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    hover: 'all 0.2s ease-in-out',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.08)',
    large: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        <meta name="format-detection" content="date=no" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <FloatingRSVPButton />
      </ThemeProvider>
    </>
  );
}
