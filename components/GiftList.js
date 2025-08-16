import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/giftListV2.module.css";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaInfoCircle, FaTimes } from "react-icons/fa";

function GiftCard({ gift, isExpanded, onToggle, onContribute }) {
  const progress = Math.min(100, ((gift.contributed || 0) / gift.price) * 100);
  const remaining = Math.max(0, gift.price - (gift.contributed || 0));

  return (
    <div className={`${styles.giftCard} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.cardFront}>
        <div className={styles.imageContainer}>
          <Image
            src={gift.image || "/images/gifts/placeholder.jpg"}
            alt={gift.name}
            width={280}
            height={200}
            className={styles.image}
          />
        </div>
        <div className={styles.cardContent}>
          <h3>{gift.name}</h3>
          <button 
            className={styles.infoButton}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(gift.id);
            }}
          >
            <FaInfoCircle /> Más información
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className={styles.cardBack}>
          <button 
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(null);
            }}
          >
            <FaTimes />
          </button>
          <div className={styles.details}>
            <p className={styles.description}>{gift.description}</p>
            <p className={styles.price}>Precio: €{gift.price.toFixed(2)}</p>
            
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
            <p className={styles.remaining}>Faltan €{remaining.toFixed(2)}</p>
            
            <div className={styles.actions}>
              <a 
                href={gift.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                <FaExternalLinkAlt /> Ver en tienda
              </a>
              <button 
                className={`${styles.actionButton} ${styles.partialButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onContribute(gift, 'partial');
                }}
              >
                Aportar parte
              </button>
              <button 
                className={`${styles.actionButton} ${styles.fullButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onContribute(gift, 'full');
                }}
              >
                Regalar completo
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalInfo, setModalInfo] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Iniciando solicitud de regalos...');
        
        const response = await fetch('/api/gifts');
        console.log('Respuesta recibida:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en la respuesta:', errorText);
          throw new Error(`Error al cargar los regalos: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        if (!data.gifts || !Array.isArray(data.gifts)) {
          console.error('Formato de datos inválido:', data);
          throw new Error('Formato de datos inválido recibido del servidor');
        }
        
        setGifts(data.gifts);
      } catch (err) {
        console.error('Error al cargar los regalos:', err);
        setError(err.message || 'Error al cargar los regalos. Por favor, recarga la página o inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleContribution = (gift, type) => {
    const amount = type === 'full' ? (gift.price - (gift.contributed || 0)) : null;
    setModalInfo({
      giftId: gift.id,
      giftName: gift.name,
      type,
      amount
    });
  };

  const handleCloseModal = () => {
    setModalInfo(null);
    setValidationError('');
  };

  const handleConfirmContribution = async (name, message, amount) => {
    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftId: modalInfo.giftId,
          name,
          message,
          amount: parseFloat(amount)
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la contribución');
      }

      // Actualizar la lista de regalos
      const updatedGifts = gifts.map(gift => {
        if (gift.id === modalInfo.giftId) {
          return {
            ...gift,
            contributed: (gift.contributed || 0) + parseFloat(amount)
          };
        }
        return gift;
      });

      setGifts(updatedGifts);
      setModalInfo(null);
      alert('¡Gracias por tu contribución!');
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un error al procesar tu contribución');
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando lista de regalos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>¡Ups! Algo salió mal</h3>
        <p>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className={styles.giftListContainer}>
      <div className={styles.carousel}>
        {gifts.map((gift) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            isExpanded={expandedCard === gift.id}
            onToggle={toggleCard}
            onContribute={handleContribution}
          />
        ))}
      </div>

      {modalInfo && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Contribuir a {modalInfo.giftName}</h3>
            <p>Ingresa tus datos para continuar:</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get('name').trim();
              const message = formData.get('message')?.trim() || ''; // Mensaje opcional
              let amount = modalInfo.amount;
              
              // Validar cantidad si es contribución parcial
              if (modalInfo.type === 'partial') {
                amount = parseFloat(formData.get('amount'));
                const gift = gifts.find(g => g.id === modalInfo.giftId);
                const remaining = gift.price - (gift.contributed || 0);
                
                if (isNaN(amount) || amount <= 0) {
                  setValidationError('Por favor, introduce una cantidad válida');
                  return;
                }
                
                if (amount > remaining) {
                  setValidationError(`La cantidad no puede ser mayor a €${remaining.toFixed(2)}`);
                  return;
                }
              }
              
              handleConfirmContribution(name, message, amount);
            }}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Tu nombre:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Mensaje (opcional):</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="3"
                  className={styles.textarea}
                />
              </div>
              
              {modalInfo.type === 'partial' && (
                <div className={styles.formGroup}>
                  <label htmlFor="amount">Cantidad a aportar (€):</label>
                  <input 
                    type="number" 
                    id="amount" 
                    name="amount" 
                    min="0.01"
                    max={modalInfo.amount}
                    step="0.01"
                    required
                    className={`${styles.input} ${validationError ? styles.inputError : ''}`}
                    onChange={() => setValidationError('')}
                  />
                  {validationError && (
                    <p className={styles.errorMessage}>{validationError}</p>
                  )}
                </div>
              )}
              
              <div className={styles.bankInfo}>
                <h4>Datos de la cuenta bancaria:</h4>
                <p><strong>Titular:</strong> Gustavo Terrer y Laura Barrachina</p>
                <p><strong>IBAN:</strong> ES82 0186 5001 6105 2569 6201</p>
                <p className={styles.note}>Por favor, indica tu nombre en el concepto de la transferencia.</p>
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className={styles.confirmButton}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className={styles.bankInfoFixed}>
        <h4>O si lo prefieres, puedes hacer una transferencia directa:</h4>
        <p><strong>Titular:</strong> Gustavo Terrer y Laura Barrachina</p>
        <p><strong>IBAN:</strong> ES82 0186 5001 6105 2569 6201</p>
        <p className={styles.note}>Por favor, indica tu nombre en el concepto de la transferencia.</p>
      </div>
    </div>
  );
}
