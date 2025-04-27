import React from "react";
import { FaChurch, FaGlassCheers, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const details = [
  {
    icon: <FaChurch />, title: "Ceremonia", time: "13:00 h", place: "Iglesia San Juan y San Vicente, Valencia"
  },
  {
    icon: <FaGlassCheers />, title: "Convite", time: "", place: "Masía de Campo Aníbal, Camí Llíria, 46540, El Puig de Santa Maria, Valencia"
  }
];

import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function EventDetails() {
  // Imagen elegante antes del bloque de detalles
  // Alt: "Gustavo y Laura celebrando juntos"
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="event-details-section">
      <div className="event-details-flex">
        <div className="event-details-img-side">
          <img src="/Evento.JPG" alt="Gustavo y Laura celebrando juntos" />
        </div>
        <div className="event-details-content-side fade-in" ref={fadeRef}>
          <h2>Detalles de la boda</h2>
          <div className="event-details-blocks">
            {details.map((d, i) => (
              <div className="event-detail-card" key={i}>
                <span className="event-icon">{d.icon}</span>
                <div className="event-info">
                  <h3>{d.title}</h3>
                  {d.time && <p><FaClock style={{marginRight:4}}/>{d.time}</p>}
                  <p><FaMapMarkerAlt style={{marginRight:4}}/>{d.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .event-details-section {
          background: #fff;
          padding: 0;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }
        .event-details-flex {
          display: flex;
          flex-direction: row;
          min-height: 340px;
          width: 100%;
        }
        .event-details-img-side {
          flex: 1 1 50%;
          min-width: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          position: relative;
          overflow: hidden;
        }
        .event-details-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
        }
        .event-details-content-side {
          flex: 1 1 50%;
          min-width: 0;
          padding: 4rem 3vw 4rem 3vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .event-details-overlay {
          width: 100%;
          padding: 4rem 0 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
        }
        .event-details-content-side h2 {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 2.5rem;
          color: #7D8B6A;
          letter-spacing: 0.04em;
          width: 100%;
        }
        .event-details-blocks {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }
        .event-detail-card {
          background: rgba(200,216,200,0.92);
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(191,167,106,0.09);
          padding: 2rem 2.5rem;
          flex: 1 1 320px;
          display: flex;
          align-items: flex-start;
          gap: 1.3rem;
          min-width: 270px;
          max-width: 340px;
        }
        .event-icon {
          font-size: 2.6rem;
          color: #7D8B6A;
          flex-shrink: 0;
        }
        .event-info h3 {
          margin: 0 0 0.2em 0;
          font-size: 1.3rem;
          color: #5F805F;
        }
        .event-info p {
          margin: 0.2em 0;
          color: #5F805F;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
        }
        @media (max-width: 900px) {
          .event-details-flex {
            flex-direction: column-reverse;
          }
          .event-details-img-side, .event-details-content-side {
            flex: unset;
            width: 100%;
            min-width: unset;
          }
          .event-details-img-side {
            height: 220px;
            max-height: 35vw;
          }
          .event-details-content-side {
            padding: 2.5rem 1rem;
          }
        }
        @media (max-width: 700px) {
          .event-details-blocks {
            flex-direction: column;
            align-items: center;
          }
          .event-detail-card {
            width: 100%;
            min-width: unset;
            max-width: 95vw;
          }
        }
      `}</style>
    </section>
  );
}
