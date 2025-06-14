import React from "react";
import { FaChurch, FaGlassCheers, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const details = [
  {
    icon: <FaChurch />,
    title: "Ceremonia",
    time: "12:45 h",
    place: "Iglesia San Juan y San Vicente, Valencia",
    iframe: "https://www.google.com/maps?q=Iglesia+de+San+Juan+y+San+Vicente,+Valencia,+España&hl=es&z=16&output=embed"
  },
  {
    icon: <FaGlassCheers />,
    title: "Convite",
    time: "",
    place: "Masía de Campo Aníbal, Camí Llíria, 46540, El Puig de Santa Maria, Valencia",
    iframe: "https://www.google.com/maps?q=Masía+de+Campo+Aníbal,+El+Puig+de+Santa+Maria,+Valencia,+España&hl=es&z=16&output=embed"
  }
];

import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

import { useState, useEffect } from "react";

export default function EventDetails() {
  const [openMap, setOpenMap] = useState(null);
  useEffect(() => {
    if (openMap !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openMap]);
  // Imagen elegante antes del bloque de detalles
  // Alt: "Gustavo y Laura celebrando juntos"
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="event-details-section">
      <div className="event-details-flex">
        <div className="event-details-img-side">
          <img src="/Dirección.JPG" alt="Dirección de Gustavo y Laura" />
        </div>
        <div className="event-details-content-side fade-in" ref={fadeRef}>
          <h2>Detalles de la boda</h2>
          <p style={{
            textAlign: 'center',
            color: '#6B8E7E',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.6',
            fontFamily: 'Lato, sans-serif'
          }}>
La celebración comenzará con la ceremonia en la iglesia de San Juan y San Vicente a las 12:45, seguida de un cóctel y banquete en la Masía de Campo Aníbal, donde continuaremos la fiesta.
          </p>
          <div className="event-details-blocks">
            {details.map((d, i) => (
  <div
    className={`event-detail-card clickable`}
    key={i}
    tabIndex={0}
    title={`Mostrar mapa de ${d.title}`}
    style={{ textDecoration: 'none', color: 'inherit' }}
    onClick={() => setOpenMap(i)}
    onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setOpenMap(i); }}
  >
    <span className="event-icon">{d.icon}</span>
    <div className="event-info">
      <h3>{d.title}</h3>
      {d.time && <p><FaClock style={{
    marginRight: 4,
    fontSize: d.title === 'Ceremonia' ? '0.9em' : '1em',
    verticalAlign: 'middle',
    color: '#8BA393',
    opacity: 0.9
  }}/><span style={{color: '#6B8E7E'}}>{d.time}</span></p>}
      <p><FaMapMarkerAlt style={{
        marginRight: 4,
        fontSize: d.title === 'Ceremonia' ? '0.9em' : '1.2em',
        verticalAlign: 'middle',
        position: 'relative',
        top: d.title === 'Ceremonia' ? '0' : '-1px',
        color: '#8BA393',
        opacity: 0.9
      }}/><span style={{color: '#6B8E7E'}}>{d.place}</span></p>
      {d.title === 'Ceremonia' && (
        <p style={{
          margin: '0.5em 0 0 0',
          fontSize: '0.9em',
          color: '#8BA393',
          display: 'flex',
          alignItems: 'flex-start',
          lineHeight: '1.5'
        }}>
          <span style={{
            display: 'inline-flex',
            marginRight: '0.5em',
            color: '#8BA393',
            fontSize: '1.1em',
            marginTop: '0.15em'
          }}>Ⓟ</span>
          <span style={{color: '#6B8E7E'}}>Parking más cercano: Mercado de Colón</span>
        </p>
      )}
    </div>
  </div>
))}

{openMap !== null && (
  <div className="map-modal-overlay" onClick={() => setOpenMap(null)}>
    <div className="map-modal" onClick={e => e.stopPropagation()}>
      <button className="close-map-modal" onClick={() => setOpenMap(null)} aria-label="Cerrar mapa">×</button>
      <iframe
        src={details[openMap].iframe}
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: 16 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa de ${details[openMap].title}`}
      ></iframe>
      <div className="map-modal-title">{details[openMap].title}</div>
    </div>
  </div>
) }
          </div>
        </div>
      </div>
      <style jsx>{`
        .event-details-section {
          background: #fff;
          padding: 4rem 0;
          width: 100%;
          margin: 0;
        }
        .event-details-flex {
          display: flex;
          flex-direction: row;
          min-height: 340px;
          width: 100%;
        }
        .event-details-img-side {
          flex: 0 0 50%;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 1rem;
          aspect-ratio: 3/4;
        }
        .event-details-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .event-details-content-side {
          flex: 1 1 55%;
          min-width: 0;
          padding: 3rem 5%;
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
  background: rgba(232, 240, 232, 0.95);
  border-radius: 0;
  box-shadow: 0 4px 18px rgba(191,167,106,0.09);
  padding: 1rem 1.5rem;
  flex: 1 1 auto;
  display: flex;
  align-items: flex-start;
  gap: 1.3rem;
  min-width: 240px;
  max-width: 300px;
  cursor: pointer;
  transition: box-shadow 0.16s, background 0.16s, transform 0.14s;
}
.event-detail-card.clickable:hover, .event-detail-card.clickable:focus {
  background: #f9fbf9;
  box-shadow: 0 8px 32px rgba(191,167,106,0.18);
  transform: translateY(-3px) scale(1.025);
  outline: none;
}
        .event-icon {
          font-size: 2.6rem;
          color: #A0B8A8;
          flex-shrink: 0;
          opacity: 0.9;
        }
        .event-info h3 {
          margin: 0 0 0.2em 0;
          font-size: 1.3rem;
          color: #6B8E7E;
          font-weight: 500;
        }
        .event-info p {
          margin: 0.2em 0;
          color: #5F805F;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .event-details-flex {
            flex-direction: column;
          }
          .event-details-img-side {
            aspect-ratio: 3/4;
            max-height: 70vh;
            padding: 0.5rem 1rem;
            width: 100%;
          }
          .event-details-content-side {
            padding: 1.5rem 1rem;
            width: 100%;
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
            max-width: 85vw;
            padding: 0.5rem 1rem;
          }
          .event-details-content-side {
            padding: 1rem 0.5rem;
          }
        }
      .map-modal-overlay {
        position: fixed;
        z-index: 1000;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(34, 34, 34, 0.72);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(3px);
        animation: fadeIn 0.18s;
      }
      .map-modal {
        background: #fffdf9;
        border-radius: 18px;
        box-shadow: 0 8px 32px rgba(191,167,106,0.19);
        padding: 2.5rem 2rem 2rem 2rem;
        max-width: 540px;
        width: 95vw;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: popIn 0.18s;
      }
      .close-map-modal {
        position: absolute;
        top: 1.1rem;
        right: 1.1rem;
        background: none;
        border: none;
        font-size: 2.1rem;
        color: #7D8B6A;
        cursor: pointer;
        z-index: 10;
        transition: color 0.15s;
      }
      .close-map-modal:hover, .close-map-modal:focus {
        color: #BFA76A;
        outline: none;
      }
      .map-modal-title {
        margin-top: 1.2rem;
        font-size: 1.25rem;
        color: #5F805F;
        font-family: 'Lato', 'Open Sans', Arial, sans-serif;
        text-align: center;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes popIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
       }
      `}</style>
    </section>
  );
}
