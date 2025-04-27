import React from "react";
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function AddressesSection() {
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="addresses-section">
      <div className="addresses-flex">
        <div className="addresses-content-side fade-in" ref={fadeRef}>
          <h2>Nuestra info</h2>
          <div className="addresses-cards">
            <div className="address-card">
              <h3>Gustavo</h3>
              <p>Calle Cirilo Amorós 69<br/>piso 2, puerta 4<br/>Valencia, 46004</p>
              <p style={{color:'#5F805F',marginTop:'0.4em',fontSize:'1.07em'}}><span role="img" aria-label="tel">📞</span> 693231823</p>
            </div>
            <div className="address-card">
              <h3>Laura</h3>
              <p>Avenida de Aragón 4<br/>piso 7, puerta 12<br/>Valencia, 46021</p>
              <p style={{color:'#5F805F',marginTop:'0.4em',fontSize:'1.07em'}}><span role="img" aria-label="tel">📞</span> 722525224</p>
            </div>
          </div>
        </div>
        <div className="addresses-img-side">
          <img src="/Dirección.JPG" alt="Dirección de Gustavo y Laura" />
        </div>
      </div>
      <style jsx>{`
        .addresses-section {
          background: #fff;
          padding: 0;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }
        .addresses-flex {
          display: flex;
          flex-direction: row;
          min-height: 340px;
          width: 100%;
        }
        .addresses-content-side {
          flex: 1 1 50%;
          min-width: 0;
          padding: 4rem 3vw 4rem 3vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .addresses-content-side h2 {
          text-align: center;
          color: #5F805F;
          font-size: 2.2rem;
          margin: 2.2rem 0 2.5rem 0;
          width: 100%;
        }
        @media (max-width: 900px) {
          .addresses-content-side h2 {
            margin: 2.2rem 0 2.5rem 0;
          }
        }
        .addresses-cards {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .addresses-img-side {
          flex: 1 1 50%;
          min-width: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          position: relative;
          overflow: hidden;
        }
        .addresses-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
        }
        .address-card {
          background: rgba(200,216,200,0.92);
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(191,167,106,0.09);
          padding: 2rem 2.5rem;
          flex: 1 1 320px;
          min-width: 270px;
          max-width: 340px;
        }
        .address-card h3 {
          font-size: 1.3rem;
          color: #7D8B6A;
          margin-bottom: 0.5em;
        }
        .address-card p {
          color: #2D2A2A;
          font-size: 1.05rem;
          margin: 0;
        }
        @media (max-width: 900px) {
          .addresses-flex {
            flex-direction: column-reverse;
          }
          .addresses-img-side, .addresses-content-side {
            flex: unset;
            width: 100%;
            min-width: unset;
          }
          .addresses-img-side {
            height: 220px;
            max-height: 35vw;
          }
          .addresses-content-side {
            padding: 2.5rem 1rem;
          }
        }
        @media (max-width: 700px) {
          .addresses-cards {
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .address-card {
            width: 100%;
            min-width: unset;
            max-width: 95vw;
          }
        }
      `}</style>
    </section>
  );
}
