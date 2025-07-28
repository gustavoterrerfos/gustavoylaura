import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import InvitationSection from '../components/InvitationSection';
import EventDetails from '../components/EventDetails';
import RSVPSection from '../components/RSVPSection';
import AddressesSection from '../components/AddressesSection';
import GiftsSection from '../components/GiftsSection';
import ThanksSection from '../components/ThanksSection';

export default function Home() {
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
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 1.5rem 3rem 1.5rem',
        background: '#fffdf9'
      }}>
        <section id="evento"><EventDetails /></section>
        <section id="rsvp-section-anchor" className="rsvp-section"><RSVPSection /></section>
        <section id="d"><AddressesSection /></section>
      </div>
      <section id="regalos"><GiftsSection /></section>
      <ThanksSection />
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        nav {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          z-index: 1000;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .sticky-nav a {
          color: #6B8E7E;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          margin: 0 1.2rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .sticky-nav a:hover {
          color: #BFA76A;
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
