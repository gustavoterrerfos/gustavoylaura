import React from "react";
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function GiftsSection() {
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="gifts-section">
      <div className="gifts-flex-container">
        <div className="gifts-content fade-in" ref={fadeRef}>
          <h2 className="section-title" style={{ marginBottom: '1.5rem', color: '#8B6F5E' }}>Proyecto familia</h2>
          <p style={{marginBottom:'1.2em', lineHeight: '1.7', fontSize: '1.05em', color: '#6B8E7E'}}>
            Lo más importante para nosotros es contar con tu compañía y tus oraciones en este día tan especial.
          </p>
          <p style={{marginBottom:'1.2em', lineHeight: '1.7', fontSize: '1.05em', color: '#6B8E7E'}}>
            Pero si además te hace ilusión tener un detalle con nosotros (y no sabes dónde dejar al pobre sobre o no llevas nada suelto), te dejamos por aquí un pequeño "buzón digital":
          </p>
          <div className="bank-account" style={{
            color: '#6B8E7E',
            fontSize: '0.85em',
            margin: '1.5em 0',
            padding: '0.8em',
            borderTop: '1px solid #B8C2B9',
            borderBottom: '1px solid #B8C2B9',
            letterSpacing: '0.5px'
          }}>
            <span className="no-phone-link">ES82 0186 5001 61 0525696201</span>
          </div>
          <p style={{marginTop:'1.2em', fontSize:'0.9em', color: '#8BA393', fontStyle: 'italic', maxWidth: '600px'}}>
            ¡Prometemos invertirlo en muchas cosas útiles y necesarias, como la suscripción de netflix y spotify, y algún que otro caprichito, como una cama donde dormir o una mesa donde comer!
          </p>
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
      `}</style>
    </section>
  );
}
