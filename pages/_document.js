import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta name="format-detection" content="telephone=no" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tudominio.com/" />
          <meta property="og:title" content="Boda de Gustavo y Laura" />
          <meta property="og:description" content="22 de noviembre de 2025 - Únete a nosotros para celebrar nuestro amor" />
          <meta property="og:image" content="https://tudominio.com/Portada.JPG" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="800" />
          <meta property="og:image:alt" content="Gustavo y Laura - 22 de noviembre de 2025" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://tudominio.com/" />
          <meta property="twitter:title" content="Boda de Gustavo y Laura" />
          <meta property="twitter:description" content="22 de noviembre de 2025 - Únete a nosotros para celebrar nuestro amor" />
          <meta property="twitter:image" content="https://tudominio.com/Portada.JPG" />
          <meta property="twitter:image:alt" content="Gustavo y Laura - 22 de noviembre de 2025" />
          <style jsx global>{`
            /* Evita el zoom en inputs en iOS */
            @media screen and (-webkit-min-device-pixel-ratio: 0) {
              input[type="text"],
              input[type="email"],
              input[type="tel"],
              input[type="number"],
              input[type="date"],
              input[type="time"],
              textarea,
              select {
                font-size: 16px !important;
              }
            }
            
            /* Asegura que los inputs mantengan un tamaño de fuente legible */
            input, textarea, select {
              font-size: 16px !important;
            }
            
            /* Mejora la experiencia de desplazamiento en iOS */
            html {
              -webkit-text-size-adjust: 100%;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
