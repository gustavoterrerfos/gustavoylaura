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
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: ${theme.fonts.sans};
            color: ${theme.colors.text};
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: ${theme.fonts.serif};
            font-weight: 500;
            line-height: 1.2;
            margin-top: 0;
            color: ${theme.colors.green};
          }
          a {
            color: ${theme.colors.darkGold};
            text-decoration: none;
            transition: ${theme.transitions.hover};
          }
          a:hover {
            color: ${theme.colors.gold};
          }
          button {
            cursor: pointer;
            font-family: ${theme.fonts.sans};
            transition: ${theme.transitions.hover};
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Estilos para inputs en móviles */
          input, textarea, select {
            font-size: 16px !important;
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
            border-radius: 0;
          }
          
          /* Evita el zoom en iOS */
          @supports (-webkit-overflow-scrolling: touch) {
            input, textarea {
              font-size: 16px !important;
            }
          }
          
          /* Mejora el espaciado en formularios móviles */
          form {
            -webkit-overflow-scrolling: touch;
          }
          
          /* Asegura que los botones de los formularios sean táctiles */
          button, input[type="button"], input[type="submit"] {
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Previene que los números se conviertan en enlaces */
          a[href^="tel"],
          a[href^="sms"],
          a[href*="bank"],
          a[href*="cuenta"],
          .no-phone-link {
            color: inherit !important;
            text-decoration: none !important;
            pointer-events: none;
            cursor: default;
          }
          
          /* Estilo específico para números de teléfono y cuentas */
          .phone-number, .bank-account {
            color: inherit;
            text-decoration: none;
            pointer-events: none;
          }
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }
          .section {
            padding: 5rem 0;
          }
          .section-title {
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 3rem;
            position: relative;
            display: inline-block;
            left: 50%;
            transform: translateX(-50%);
          }
          .section-title:after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: ${theme.colors.gold};
          }
        `}</style>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <FloatingRSVPButton />
      </ThemeProvider>
    </>
  );
}
