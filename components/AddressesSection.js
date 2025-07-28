import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function AddressesSection() {
  const fadeRef = useFadeInOnScroll();
  
  return (
    <section className="section" style={{ 
      background: 'var(--color-background)',
      padding: '60px 0 80px',
      margin: '-40px 0 -20px',
      overflow: 'visible',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container">
        <h2 className="section-title">Nuestra información</h2>
        
        <div className="addresses-container">
          <div className="addresses-image" ref={fadeRef}>
            <div className="image-container">
              <div className="annotated-image">
                <img 
                  src="/Evento.JPG" 
                  alt="Gustavo y Laura celebrando juntos" 
                  className="elegant-image"
                />
                
                {/* Gustavo Info */}
                <div className="info-box gustavo">
                  <h4>Gustavo</h4>
                  <p>C/ Cirilo Amorós 69,<br />piso 2 puerta 4</p>
                  <p>Valencia, 46004</p>
                  <p className="phone-number">693 231 823</p>
                </div>
                
                {/* Laura Info */}
                <div className="info-box laura">
                  <h4>Laura</h4>
                  <p>Av. Aragón 4, piso 7 puerta 12</p>
                  <p>Valencia, 46021</p>
                  <p className="phone-number">722 525 224</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .section-title {
          text-align: center;
          width: 100%;
          margin: 0 auto 2rem;
          font-size: 2.25rem;
          color: #6B8E7E;
          font-family: 'Playfair Display', serif;
          font-weight: 500;
          letter-spacing: 0.05em;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .addresses-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 500px;
          border-radius: 0;
          overflow: hidden;  /* Cambiado a hidden para evitar scroll horizontal */
          background: #fff;
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
        
        /* Annotated Image Styles */
        .addresses-image {
          flex: 1;
          position: relative;
          min-height: 500px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          padding: 100px 0 150px;  /* Aumentado el padding inferior */
          background: none;
          overflow: visible;
          margin: -80px 0 -60px;  /* Aumentado el margen superior negativo */
        }
        
        .image-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 100%;
          overflow: visible;
        }
        
        .annotated-image {
          position: relative;
          width: 100%;
          height: 100%;
          padding-top: 20px;  /* Added padding to help with positioning */
        }
        
        .elegant-image {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: contain;  /* Cambiado de cover a contain para asegurar que toda la imagen sea visible */
          object-position: center center;
          display: block;
          border-radius: 0;
          margin: 40px auto;  /* Centrado y con margen superior */
        }
        
        @media (max-width: 768px) {
          .elegant-image {
            width: 150%;
            margin-left: -25%;
            max-height: 70vh;
          }
          
          @media (max-height: 700px) {
            .elegant-image {
              width: 200%;
              margin-left: -50%;
            }
          }
        }
        
        /* Info Box Styles */
        .info-box {
          position: absolute;
          background: rgba(255, 255, 255, 0.95);
          padding: 1.2rem 1.5rem;
          border-radius: 0;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          width: 240px;
          z-index: 10;
          margin: 0;
        }
        
        .info-box h4 {
          margin: 0 0 0.5rem 0;
          color: #5a6a4d;
          font-size: 1.1rem;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.3rem;
        }
        
        .info-box p {
          margin: 0.4rem 0;
          color: #4a5a3d;
          font-size: 0.9rem;
          font-family: 'Lato', sans-serif;
          line-height: 1.4;
          white-space: nowrap;
        }
        
        .gustavo {
          bottom: 0;
          left: 0;
          text-align: left;
        }
        
        .info-box.laura {
          top: -35px;  /* Ajustado a -35px desde la parte superior */
          right: 0;  /* Sin margen derecho */
          text-align: right;
          position: absolute;
        }
        
        @media (max-width: 900px) {
          .info-box {
            width: 200px;
            padding: 1rem;
          }
          
          .gustavo {
            bottom: 0;
            left: 0;
          }
          
          .laura {
            top: 0;
            right: 0;
          }
        }
        
        .icon {
          color: var(--color-gold);
          font-size: 1.2rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        
        .info-item p, 
        .info-item a {
          color: var(--color-text);
          margin: 0;
          line-height: 1.6;
          transition: color 0.3s ease;
        }
        
        .info-item a {
          color: var(--color-dark-gold);
        }
        
        @media (max-width: 992px) {
          .addresses-container {
            flex-direction: column;
          }
          
          .addresses-content {
            padding: 3rem 2rem;
          }
          
          .address-cards {
            gap: 1.5rem;
          }
          
          .address-card {
            min-height: auto;
          }
        }
        
        @media (max-width: 768px) {
          .section {
            padding: 3rem 0;
          }
          
          .section-title {
            font-size: 2rem;
            margin-bottom: 2.5rem;
          }
          
          .addresses-content {
            padding: 2rem 1.5rem;
          }
          
          .card-front {
            padding: 1.8rem;
          }
          
          .address-card h3 {
            font-size: 1.4rem;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .address-cards {
            flex-direction: column;
          }
          
          .address-card {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
