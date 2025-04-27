import React from "react";
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function GiftsSection() {
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="gifts-section">
      <div className="gifts-flex-container">
        <div className="gifts-content-side fade-in" ref={fadeRef}>
          <h2>Proyecto Familiar</h2>
          <p style={{marginBottom:'0.3em'}}>Si deseas hacernos un regalo, puedes hacerlo a través de la siguiente cuenta bancaria:</p>
          <div style={{fontWeight:600, letterSpacing:'0.01em', fontSize:'1.01em', color:'#5F805F'}}>
            ES12 3456 7890 1234 5678 9012
          </div>
          <p style={{marginTop:'0.6em', fontSize:'0.97em'}}>¡Mil gracias por acompañarnos en este día tan especial!</p>
        </div>
        <div className="gifts-img-side">
          <img src="/regalo.JPG" alt="Regalo boda Gustavo y Laura" />
        </div>
      </div>
      <style jsx>{`
        .gifts-section {
          background: #FFFDF9;
          padding: 0;
        }
        .gifts-flex-container {
          display: flex;
          flex-direction: row;
          min-height: 340px;
          width: 100%;
        }
        .gifts-content-side {
          flex: 1 1 50%;
          min-width: 0;
          padding: 4rem 3vw 4rem 3vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .gifts-content-side h2 {
          color: #5F805F;
          font-size: 2.2rem;
          margin-bottom: 1.2rem;
        }
        .gifts-img-side {
          flex: 1 1 50%;
          min-width: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          position: relative;
          overflow: hidden;
        }
        .gifts-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.08) brightness(1.06);
        }
        @media (max-width: 900px) {
          .gifts-flex-container {
            flex-direction: column-reverse;
          }
          .gifts-img-side, .gifts-content-side {
            flex: unset;
            width: 100%;
            min-width: unset;
          }
          .gifts-img-side {
            height: 220px;
            max-height: 35vw;
          }
          .gifts-content-side {
            padding: 2.5rem 1rem;
          }
        }
      `}</style>
    </section>
  );
}
