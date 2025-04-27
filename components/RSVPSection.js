import React, { useState } from "react";
import useFadeInOnScroll from '../hooks/useFadeInOnScroll';

export default function RSVPSection() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fadeRef = useFadeInOnScroll();
  return (
    <section className="rsvp-section">
      <div className="rsvp-overlay">
        <h2>Confirmación de asistencia</h2>
        <div className="fade-in" ref={fadeRef}>
          <div className="rsvp-center">
            <button className="rsvp-btn" onClick={() => setShowForm(!showForm)}>
              Confirmar asistencia
            </button>
          </div>
          {showForm && !submitted && (
            <form className="rsvp-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
              <input type="text" name="nombre" placeholder="Nombre y apellidos" required />
              <input type="email" name="email" placeholder="Correo electrónico" required />
              <input type="text" name="direccion" placeholder="Dirección postal" required />
              <select name="asistencia" required>
                <option value="">Asistencia</option>
                <option value="ceremonia">Solo ceremonia</option>
                <option value="todo">Ceremonia y convite</option>
              </select>
              <input type="text" name="intolerancias" placeholder="Intolerancias alimentarias" />
              <select name="autobus">
                <option value="">¿Necesidad de autobús?</option>
                <option value="ida">Solo ida</option>
                <option value="vuelta">Solo vuelta</option>
                <option value="ambos">Ambos</option>
                <option value="ninguno">Ninguno</option>
              </select>
              <input type="text" name="musica" placeholder="Sugerencias musicales" />
              <input type="number" name="ninos" placeholder="¿Asiste con niños? ¿Cuántos?" min="0" />
              <textarea name="comentarios" placeholder="Comentarios o preguntas adicionales" rows={3} />
              <button type="submit" className="rsvp-btn">Enviar</button>
            </form>
          )}
        {submitted && (
          <div className="rsvp-thanks">
            <p>¡Gracias por confirmar tu asistencia!<br/>Nos pondremos en contacto contigo pronto.</p>
          </div>
        )}
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
        .rsvp-center {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .rsvp-btn {
          border: 1.5px solid #EAD7B7;
          background: #FFFDF9;
          color: #BFA76A;
          border-radius: 24px;
          padding: 0.8em 2.5em;
          font-size: 1.15rem;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(234,215,183,0.08);
          transition: background 0.2s, color 0.2s, border 0.2s;
        }
        .rsvp-btn:hover {
          background: #F8E1E7;
          border-color: #E1C9A6;
        }
        .rsvp-form {
          max-width: 480px;
          margin: 0 auto;
          background: #FAF7F1;
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
          border: 1px solid #EAD7B7;
          border-radius: 12px;
          padding: 0.85em;
          font-size: 1rem;
          background: #FFFDF9;
          font-family: 'Lato', 'Open Sans', Arial, sans-serif;
        }
        .rsvp-form textarea {
          resize: vertical;
        }
        .rsvp-thanks {
          max-width: 480px;
          margin: 0 auto;
          background: #FAF7F1;
          border-radius: 18px;
          box-shadow: 0 4px 16px rgba(234,215,183,0.11);
          padding: 2.5rem 2rem 2rem 2rem;
          text-align: center;
          color: #7D8B6A;
          font-size: 1.15rem;
        }
      `}</style>
    </section>
  );
}
