import React, { useState } from "react";
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';
import GiftList from './GiftCarousel';

export default function GiftsSection() {
  const [expanded, setExpanded] = useState(false);
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="gifts-section">
      <div className="gifts-flex-container">
        <div className="gifts-content fade-in" ref={fadeRef}>
          <h2 className="section-title" style={{ marginBottom: '1.5rem', color: '#8B6F5E' }}>Nuestro proyecto familiar</h2>
          <p style={{marginBottom:'1.2em', lineHeight: '1.7', fontSize: '1.05em', color: '#6B8E7E'}}>
            Lo más importante para nosotros es contar con tu compañía y tus oraciones en este día tan especial.
            Pero si además queréis tener un detalle, cualquier ayuda para nuestro proyecto familiar será recibida con mucho cariño.
          </p>
          {!expanded && (
            <button className="toggle-btn" onClick={() => setExpanded(true)}>
              Ver lista de regalos
            </button>
          )}
          {expanded && <GiftList />}
        </div>
      </div>
      <style jsx>{`
        .gifts-section {
          background: #FFFDF9;
          padding: 0;
        }
        .gifts-flex-container {
          display: flex;
          justify-content: center;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          min-height: 200px;
        }
        .gifts-content {
          width: 100%;
          padding: 1.5rem 2rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .gifts-content h2 {
          color: #6B8E7E;
          font-size: 2.2rem;
          margin-bottom: 1.2rem;
        }
        @media (max-width: 900px) {
          .gifts-flex-container {
            padding: 0 1rem;
          }
          .gifts-content {
            padding: 3rem 1rem;
          }
        }
                .toggle-btn {
            background: #6B8E7E;
            color: #fff;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 1rem;
          }
        `}</style>
    </section>
  );
}
