import Head from 'next/head';
import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import EventDetails from '../components/EventDetails';
import MapSection from '../components/MapSection';
import RSVPSection from '../components/RSVPSection';
import AddressesSection from '../components/AddressesSection';
import GiftsSection from '../components/GiftsSection';

const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem 1.5rem;
  background: #fffdf9;
`;

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../public/sectionSnap.js');
    }
  }, []);
  return (
    <>
      <Head>
        <title>Boda Gustavo & Laura</title>
        <meta name="description" content="Boda de Gustavo Terrer y Laura Barrachina - 22 de noviembre de 2025" />
      </Head>
      <nav className="sticky-nav">
        <a href="#evento">Boda</a>
        <a href="#mapa">Dirección</a>
        <a href="#rsvp">Asistencia</a>
        <a href="#direcciones">Nosotros</a>
        <a href="#regalos">Proyecto Familiar</a>
      </nav>
      <HeroSection />
      <Main>
        <section id="evento"><EventDetails /></section>
        <section id="mapa"><MapSection /></section>
        <section id="rsvp"><RSVPSection /></section>
        <section id="direcciones"><AddressesSection /></section>
        <section id="regalos"><GiftsSection /></section>
      </Main>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 999;
          background: rgba(255,253,249,0.92);
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          padding: 0.75rem 0;
          box-shadow: 0 2px 8px rgba(191,167,106,0.04);
        }
        .sticky-nav a {
          color: #7D8B6A;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.08rem;
          border-bottom: 2px solid transparent;
          transition: border 0.2s, color 0.2s;
        }
        .sticky-nav a:hover {
          color: #BFA76A;
          border-bottom: 2px solid #BFA76A;
        }
        section {
          scroll-margin-top: 72px;
        }
        @media (max-width: 700px) {
  .sticky-nav {
    font-size: 1.03rem;
    gap: 0.3rem 0.7rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

          .sticky-nav {
            gap: 1.1rem;
            font-size: 0.98rem;
          }
        }
      `}</style>
    </>
  );
}
