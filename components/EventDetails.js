import React from "react";
import { FaChurch, FaGlassCheers, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const details = [
  {
    icon: <FaChurch />,
    title: "Ceremonia",
    time: "12:45 h",
    place: "Iglesia San Juan y San Vicente, Valencia",
    iframe: "https://www.google.com/maps?q=Iglesia+de+San+Juan+y+San+Vicente,+Valencia,+España&hl=es&z=16&output=embed",
    image: "/iglesia-watercolor.png",
    alt: "Acuarela de la iglesia de San Juan y San Vicente"
  },
  {
    icon: <FaGlassCheers />,
    title: "Convite",
    time: "",
    place: "Masía de Campo Aníbal, Camí Llíria, 46540, El Puig de Santa Maria, Valencia",
    iframe: "https://www.google.com/maps?q=Masía+de+Campo+Aníbal,+El+Puig+de+Santa+Maria,+Valencia,+España&hl=es&z=16&output=embed",
    image: "/masia-watercolor.png",
    alt: "Acuarela de la Masía de Campo Aníbal"
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
  <div className="event-detail-container" key={i}>
    <div className="event-image-container">
      <img 
        src={d.image} 
        alt={d.alt} 
        className="event-watercolor" 
        onClick={() => setOpenMap(i)}
      />
    </div>
    <div
      className="event-detail-card clickable"
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
          flex-direction: column;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .event-detail-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 3rem;
          width: 100%;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .event-image-container {
          width: 90%;
          margin: 0 auto 2rem;
          position: relative;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
        }
        .event-watercolor {
          width: 100%;
          height: auto;
          display: block;
          border: 10px solid white;
          border-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 L0,0 Z' fill='white' stroke='%23ddd' stroke-width='2' stroke-dasharray='5,5'/%3E%3C/svg%3E") 10% round;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: rotate(-0.5deg);
          transition: all 0.4s ease;
          cursor: pointer;
          background: white;
          padding: 5px;
          position: relative;
        }
        .event-watercolor::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1) 100%);
          pointer-events: none;
        }
        .event-watercolor:hover {
          transform: rotate(0.5deg) scale(1.01);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        .event-details-content-side {
          width: 100%;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
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
          flex-direction: column;
          gap: 4rem;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }
        .event-detail-card {
          background: rgba(245, 245, 240, 0.95);
          border-radius: 4px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          padding: 2rem 2.5rem;
          width: 90%;
          max-width: 600px;
          margin: -2rem auto 0;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.05);
          transform: translateY(-20px);
          text-align: center;
        }
        .event-detail-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%);
          z-index: -1;
          opacity: 0.6;
        }
        .event-detail-card:hover::before {
          opacity: 0.8;
        }
        .event-icon {
          font-size: 1.6rem;
          color: #8BA393;
          margin: 0 auto 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.03);
          position: relative;
          z-index: 1;
        }
        .event-info {
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .event-info h3 {
          margin: 0 0 0.8rem 0;
          color: #5a6d5a;
          font-size: 1.5rem;
          font-weight: 500;
          width: 100%;
        }
        .event-info p {
          margin: 0.3rem 0;
          color: #6B8E7E;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .event-detail-card.clickable:hover, .event-detail-card.clickable:focus {
          background: #f8f8f5;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
          transform: translateY(-25px) scale(1.01);
          outline: none;
        }
        @media (max-width: 768px) {
          .event-image-container {
            width: 95%;
          }
          .event-detail-card {
            width: 95%;
            padding: 1.5rem 1.2rem;
          }
          .event-details-content-side {
            padding: 2rem 1rem;
          }
          .event-detail-container {
            margin-bottom: 2rem;
          }
          .event-details-blocks {
            gap: 3rem;
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
