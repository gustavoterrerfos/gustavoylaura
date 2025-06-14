import Head from 'next/head';
import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import InvitationSection from '../components/InvitationSection';
import EventDetails from '../components/EventDetails';
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
        <a href="#evento">Detalles de la boda</a>
        <a href="#rsvp-section-anchor">Asistencia</a>
        <a href="#d">Nosotros</a>
      </nav>
      <HeroSection />
      <InvitationSection />
      <Main>
        <section id="evento"><EventDetails /></section>
        <section id="rsvp-section-anchor" className="rsvp-section"><RSVPSection /></section>
        <section id="d"><AddressesSection /></section>
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
          background: rgba(245, 249, 246, 0.95);
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          padding: 0.75rem 0;
          box-shadow: 0 2px 8px rgba(191,167,106,0.04);
        }
        .sticky-nav a {
          color: #6B8E7E;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.08rem;
          border-bottom: 2px solid transparent;
          transition: border 0.2s, color 0.2s;
        }
        .sticky-nav a:hover {
          color: #8BA393;
          border-bottom: 2px solid #8BA393;
        }
        section {
          scroll-margin-top: 72px;
        }
        @media (max-width: 700px) {
          .sticky-nav {
            overflow-x: auto;
            white-space: nowrap;
            gap: 0.7rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            font-size: 1rem;
          }
          .sticky-nav a {
            display: inline-block;
            min-width: max-content;
            font-size: 1rem;
          }
        }
        .floating-inscription-btn {
          position: fixed;
          right: 2.1rem;
          bottom: 2.1rem;
          z-index: 1200;
          background: linear-gradient(90deg, #6B8E7E 80%, #8BA393 100%);
          color: #fffdf9;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
          font-weight: 700;
          font-size: 1.13rem;
          padding: 0.95em 2.2em;
          border-radius: 28px;
          box-shadow: 0 4px 18px rgba(191,167,106,0.13);
          border: none;
          outline: none;
          text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
          cursor: pointer;
        }
        .floating-inscription-btn:hover {
          background: linear-gradient(90deg, #BFA76A 80%, #7D8B6A 100%);
          box-shadow: 0 6px 28px rgba(191,167,106,0.19);
          transform: translateY(-2px) scale(1.03);
        }
        @media (max-width: 700px) {
          .floating-inscription-btn {
            right: 1.1rem;
            bottom: 1.1rem;
            font-size: 1rem;
            padding: 0.85em 1.5em;
          }
        }
      `}</style>
    </>
  );
}
