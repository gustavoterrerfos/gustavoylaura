import React, { useState } from "react";
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';
import GiftList from './GiftList';

export default function GiftsSection() {
  const [showGifts, setShowGifts] = useState(false);
  const fadeRef = useFadeInOnScroll();
  
  const toggleGifts = () => {
    setShowGifts(!showGifts);
  };

  return (
    <section className="gifts-section">
      <div className="gifts-flex-container">
        <div className="gifts-content fade-in" ref={fadeRef}>
          <h2 className="section-title" style={{ marginBottom: '1.5rem', color: '#8B6F5E' }}>Nuestro proyecto familiar</h2>
          <p style={{marginBottom:'1.2em', lineHeight: '1.7', fontSize: '1.05em', color: '#6B8E7E'}}>
            Lo más importante para nosotros es contar con tu compañía y tus oraciones en este día tan especial.
            Pero si además queréis tener un detalle, cualquier ayuda para nuestro proyecto familiar será recibida con mucho cariño.
          </p>
          
          {!showGifts ? (
            <button 
              onClick={toggleGifts}
              className="show-gifts-button"
              aria-expanded={showGifts}
              aria-controls="gifts-list"
            >
              Ver lista de regalos
            </button>
          ) : (
            <div id="gifts-list" className="gifts-list-container">
              <GiftList />
              <button 
                onClick={toggleGifts}
                className="hide-gifts-button"
                aria-label="Ocultar lista de regalos"
              >
                Ocultar lista
              </button>
            </div>
          )}
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
        
        .show-gifts-button,
        .hide-gifts-button {
          background: #8B6F5E;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .show-gifts-button:hover,
        .hide-gifts-button:hover {
          background: #6B5A4D;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
        
        .show-gifts-button:active,
        .hide-gifts-button:active {
          transform: translateY(0);
        }
        
        .hide-gifts-button {
          background: #6B8E7E;
          margin-top: 2rem;
          padding: 10px 20px;
          font-size: 0.9rem;
        }
        
        .gifts-list-container {
          width: 100%;
          margin-top: 1.5rem;
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 900px) {
          .gifts-flex-container {
            padding: 0 1rem;
          }
          .gifts-content {
            padding: 3rem 1rem;
          }
          
          .show-gifts-button,
          .hide-gifts-button {
            padding: 10px 20px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}