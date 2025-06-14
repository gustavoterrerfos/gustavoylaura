import React, { useState, useEffect } from "react";

export default function RSVPSection() {
  const [showForm, setShowForm] = useState(false);
  const formRef = React.useRef(null);

  useEffect(() => {
    const openForm = () => setShowForm(true);
    window.addEventListener('openRSVPForm', openForm);
    return () => window.removeEventListener('openRSVPForm', openForm);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showForm && formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showForm]);

  return (
    <section id="rsvpSection" className="rsvp-section">
      <div className="rsvp-overlay">
        <h2>Confirmación de asistencia</h2>
        <div className="rsvp-center">
          {!showForm && (
            <button className="rsvp-btn" onClick={() => setShowForm(true)}>
              Confirmar asistencia
            </button>
          )}
        </div>
        <div ref={formRef} className={`rsvp-form-embed${showForm ? ' open' : ''}${!showForm ? ' closed' : ''}`}
          aria-hidden={!showForm}
        >
          <iframe
            src="https://forms.gle/Z6ARPPji9Uqgr8kr8"
            width="100%"
            height="750"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Confirmación de asistencia"
            style={{background: 'white', borderRadius: '18px', boxShadow: '0 4px 16px rgba(156, 163, 175, 0.11)'}}
            allowFullScreen
            tabIndex={showForm ? 0 : -1}
          >
            Cargando…
          </iframe>
        </div>
      </div>
      <style jsx>{`
        .rsvp-section {
          position: relative;
          padding: 0;
          min-height: 420px;
          background: linear-gradient(rgba(183,197,170,0.82), rgba(255,255,255,0.85)), url('/RSVP.JPG') center center/cover no-repeat;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rsvp-overlay {
          width: 100%;
          padding: 4rem 0 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .rsvp-section h2 {
          text-align: center;
          color: #5F805F;
          font-size: 2.2rem;
          margin-bottom: 2.5rem;
        }
        .rsvp-form-embed {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transform: translateY(32px) scale(0.98);
          transition: opacity 0.45s cubic-bezier(.4,0,.2,1), transform 0.45s cubic-bezier(.4,0,.2,1);
          height: 0;
          overflow: hidden;
        }
        .rsvp-form-embed.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0) scale(1);
          height: auto;
          margin-top: 1.3rem;
          margin-bottom: 1.3rem;
        }
        .rsvp-form-embed.closed {
          opacity: 0;
          pointer-events: none;
          transform: translateY(32px) scale(0.98);
          height: 0;
          margin-top: 0;
          margin-bottom: 0;
        }
        @media (max-width: 700px) {
          .rsvp-form-embed,
          .rsvp-form-embed.open {
            max-width: 99vw;
          }
          .rsvp-form-embed iframe {
            min-height: 480px;
            height: 70vw;
          }
        }
        .rsvp-btn {
          border: 1.5px solid #B8C2B9;
          background: #FFFDF9;
          color: #6B8E7E;
          border-radius: 24px;
          padding: 0.8em 2.5em;
          font-size: 1.15rem;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(107, 142, 126, 0.1);
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .rsvp-btn:hover {
          background: #F0F5F1;
          border-color: #8BA393;
        }
        .rsvp-form {
          max-width: 480px;
          margin: 0 auto;
          background: #F9FAFB;
          border-radius: 18px;
          box-shadow: 0 4px 16px rgba(234,215,183,0.11);
          padding: 2.5rem 2rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .rsvp-form input,
        .rsvp-form select,
        .rsvp-form textarea {
          border: 1px solid #B8C2B9;
          border-radius: 12px;
          padding: 0.85em;
          font-size: 1rem;
          background: #FFFFFF;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
        }
        .rsvp-form textarea {
          resize: vertical;
        }
        .rsvp-thanks {
          max-width: 480px;
          margin: 0 auto;
          background: #F9FAFB;
          border-radius: 18px;
          box-shadow: 0 4px 16px rgba(107, 142, 126, 0.12);
          padding: 2.5rem 2rem 2rem 2rem;
          text-align: center;
          color: #7D8B6A;
          font-size: 1.15rem;
        }
      `}</style>
    </section>
  );
}
