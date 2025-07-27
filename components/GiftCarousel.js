import { useState, useEffect } from 'react';
import styles from './giftList.module.css';

export default function GiftCarousel() {
  const [gifts, setGifts] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/gifts');
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API: ' + response.status);
      }

      const data = await response.json();
      
      if (!data || !data.gifts) {
        throw new Error('Respuesta de la API inválida');
      }

      setGifts(data.gifts.map(gift => ({
        ...gift,
        price: parseFloat(gift.price),
        contributed: parseFloat(gift.contributed),
        contributors: []
      })));
    } catch (err) {
      setError(err.message || 'Error al cargar los regalos');
      console.error('Error en fetchGifts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (gift) => {
    setModalInfo({
      giftId: gift.id,
      giftName: gift.name,
      giftPrice: gift.price,
      giftContributed: gift.contributed,
      giftLink: gift.link
    });
  };

  const handleCloseModal = () => {
    setModalInfo(null);
  };

  const handleConfirm = async (name, message, amount) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!modalInfo || !modalInfo.giftId) {
        throw new Error('Información del regalo no válida');
      }

      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new Error('Cantidad inválida');
      }

      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftId: modalInfo.giftId,
          name,
          message,
          amount: numericAmount
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al registrar la contribución');
      }

      const data = await response.json();
      if (!data || !data.success) {
        throw new Error('Respuesta de la API inválida');
      }

      // Actualizar el estado local
      setGifts(prev =>
        prev.map(g =>
          g.id === modalInfo.giftId
            ? {
                ...g,
                contributed: Math.min(g.price, g.contributed + numericAmount)
              }
            : g
        )
      );
    } catch (err) {
      setError(err.message || 'Error al registrar la contribución');
      console.error('Error en handleConfirm:', err);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  if (loading) {
    return (
      <div className={styles.grid}>
        <div className={styles.card}>
          <p>Cargando regalos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.grid}>
        <div className={styles.card}>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {gifts.map((gift) => (
        <div key={gift.id} className={styles.card}>
          <div className={styles.imgWrapper}>
            <img src={gift.image} alt={gift.name} className={styles.img} />
          </div>
          <h3>{gift.name}</h3>
          <p>{gift.description}</p>
          <div className={styles.price}>{gift.price}€</div>
          <div className={styles.contribution}>
            <div className={styles.contributionBar}>
              <div className={styles.contributionProgress} style={{ width: `${(gift.contributed / gift.price) * 100}%` }}></div>
            </div>
            <div className={styles.contributionText}>
              {gift.contributed}€ de {gift.price}€
            </div>
          </div>
          <div className={styles.actions}>
            <button onClick={() => handleOpenModal(gift)}>
              {gift.contributed === 0 ? 'Regalar completo' : 'Aportar parte'}
            </button>
            <a href={gift.link} target='_blank' rel='noopener noreferrer'>
              Ver en tienda
            </a>
          </div>
        </div>
      ))}

      {modalInfo && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Contribuir a {modalInfo.giftName}</h2>
            <div className={styles.modalGiftInfo}>
              <div className={styles.modalPrice}>
                <span>Precio total:</span>
                <strong>{modalInfo.giftPrice}€</strong>
              </div>
              <div className={styles.modalContributed}>
                <span>Contribuido:</span>
                <strong>{modalInfo.giftContributed}€</strong>
              </div>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const name = formData.get('name');
              const message = formData.get('message');
              const amount = parseFloat(formData.get('amount'));
              handleConfirm(name, message, amount);
            }}>
              <div className={styles.modalForm}>
                <div className={styles.modalFormField}>
                  <label htmlFor='name'>Nombre:</label>
                  <input type='text' id='name' name='name' required />
                </div>
                <div className={styles.modalFormField}>
                  <label htmlFor='message'>Mensaje (opcional):</label>
                  <textarea id='message' name='message'></textarea>
                </div>
                <div className={styles.modalFormField}>
                  <label htmlFor='amount'>Cantidad:</label>
                  <input type='number' id='amount' name='amount' step='0.01' required />
                </div>
                <div className={styles.modalFormActions}>
                  <button type='submit'>Confirmar contribución</button>
                  <button type='button' onClick={handleCloseModal}>Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
