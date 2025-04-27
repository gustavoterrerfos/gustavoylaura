import React, { useState } from "react";

import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function MapSection() {
  const [showMap, setShowMap] = useState(false);
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="map-section">
      <h2>Cómo llegar</h2>
      <div className="map-flex-container">
        <div className="map-img-side" onClick={() => setShowMap(true)}>
          <img src="/mapa-esquematico.jpg" alt="Mapa esquemático del recorrido" />
          <div className="map-overlay-side">
            <span>Cómo llegar</span>
          </div>
        </div>
        <div className="map-content-side fade-in" ref={fadeRef}>
          <h2>Cómo llegar</h2>
          <p style={{color:'#5F805F',fontSize:'1.07em',marginBottom:'2em'}}>Consulta cómo llegar desde la iglesia a la masía o haz click en el mapa para ver el recorrido interactivo.</p>
        </div>
        {showMap && (
          <div className="map-modal" onClick={() => setShowMap(false)}>
            <div className="map-modal-content" onClick={e => e.stopPropagation()} style={{boxShadow:'none',borderRadius:0,border:'none'}}>
              <button className="close-btn" onClick={() => setShowMap(false)}>&times;</button>
              <iframe
                title="Recorrido Iglesia a Masía"
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3107.200392668177!2d-0.3771643846497276!3d39.47621797948511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xd604f1e2e0e4d6f%3A0x8c1e3c6d3f3b7a6e!2sIglesia%20de%20San%20Juan%20y%20San%20Vicente%2C%20Valencia!3m2!1d39.476218!2d-0.374975!4m5!1s0xd604f2b1f3b7a6e%3A0x8c1e3c6d3f3b7a6e!2sMas%C3%ADa%20de%20Campo%20An%C3%ADbal%2C%20Cam%C3%AD%20Ll%C3%ADria%2C%2046540%2C%20El%20Puig%20de%20Santa%20Maria%2C%20Valencia!3m2!1d39.565218!2d-0.307975!5e0!3m2!1ses!2ses!4v1713530000000!5m2!1ses!2ses"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '18px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .map-section {
          width: 100vw;
          background: #FFFDF9;
          padding: 0;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }
        .map-flex-container {
          display: flex;
          flex-direction: row;
          min-height: 340px;
          width: 100%;
        }
        .map-img-side {
          flex: 1 1 50%;
          min-width: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          width: 100vw;
          max-width: 100vw;
        }
        .map-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.12) brightness(1.06);
          transition: filter 0.2s;
        }
        .map-img-side:hover img {
          filter: grayscale(0) brightness(1);
        }
        .map-overlay-side {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(169,213,199,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5F805F;
          font-size: 2rem;
          font-family: 'Playfair Display', serif;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .map-img-side:hover .map-overlay-side {
          opacity: 1;
          pointer-events: auto;
        }
        .map-content-side {
          flex: 1 1 50%;
          min-width: 0;
          padding: 4rem 3vw 4rem 3vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .map-content-side h2 {
          color: #5F805F;
          font-size: 2.2rem;
          margin-bottom: 1.2rem;
        }
        .map-modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(45,42,42,0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .map-modal-content {
          background: #FFFDF9;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(191,167,106,0.18);
          position: relative;
          max-width: 700px;
          width: 95vw;
        }
        .close-btn {
          position: absolute;
          top: 1rem; right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: #5F805F;
          cursor: pointer;
        }
        @media (max-width: 900px) {
          .map-flex-container {
            flex-direction: column;
          }
          .map-img-side, .map-content-side {
            flex: unset;
            width: 100vw;
            min-width: unset;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
          }
          .map-img-side {
            height: 220px;
            max-height: 35vw;
          }
          .map-content-side {
            padding: 2.5rem 1rem;
          }
        }
      `}</style>
    </section>
  );
}
