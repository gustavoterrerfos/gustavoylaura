import { useState } from "react";
import Image from "next/image";
import styles from "../styles/giftList.module.css";

const initialGifts = [
  {
    id: 1,
    name: "Hegas – Mueble TV 180 natural",
    description: "Mueble de TV 180 cm en acabado natural.",
    image: "/images/gifts/hegas-mueble-tv.jpg",
    price: 330.65,
    contributed: 0,
    link: "https://kenayhome.com/es/17438-hegas-mueble-tv-180-natural.html?utm_source=Connectif&utm_medium=carrusel&utm_campaign=productosRecomendados",
  },
];

export default function GiftListSingle() {
  const [gifts, setGifts] = useState(initialGifts);
  const [modalInfo, setModalInfo] = useState(null); // {giftId, type}

  const openModal = (giftId, type) => setModalInfo({ giftId, type });
  const closeModal = () => setModalInfo(null);

  const handleConfirm = (name, message, amount) => {
    setGifts(prev =>
      prev.map(g =>
        g.id === modalInfo.giftId
          ? { ...g, contributed: Math.min(g.price, g.contributed + amount) }
          : g
      )
    );
    closeModal();
  };

  return (
    <div className={styles.grid}>
      {gifts.map(gift => {
        const progress = Math.min(100, (gift.contributed / gift.price) * 100);
        const remaining = (gift.price - gift.contributed).toFixed(2);

        return (
          <div key={gift.id} className={styles.card}>
            <div className={styles.imgWrapper}>
              <Image
                src={gift.image}
                alt={gift.name}
                width={300}
                height={200}
                className={styles.img}
              />
            </div>
            <h3>{gift.name}</h3>
            <p>{gift.description}</p>
            <p className={styles.price}>€{gift.price}</p>
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={styles.remaining}>Quedan €{remaining}</p>
            <div className={styles.actions}>
              {remaining > 0 && (
                <>
                  <button onClick={() => openModal(gift.id, "full")}>Regalar completo</button>
                  <button onClick={() => openModal(gift.id, "partial")}>Aportar parte</button>
                </>
              )}
              <a href={gift.link} target="_blank" rel="noopener noreferrer">
                Ver en tienda
              </a>
            </div>
          </div>
        );
      })}

      {modalInfo && (
        <Modal
          info={modalInfo}
          gift={gifts.find(g => g.id === modalInfo.giftId)}
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

function Modal({ info, gift, onClose, onConfirm }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(
    info.type === "full" ? gift.price - gift.contributed : ""
  );

  const submit = () => {
    const numeric = Number(amount);
    if (isNaN(numeric) || numeric <= 0) return;
    onConfirm(name, message, numeric);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        <h3>¡Gracias por tu regalo!</h3>
        <p>{gift.name}</p>
        <label>
          Tu nombre
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Mensaje opcional
          <textarea value={message} onChange={e => setMessage(e.target.value)} />
        </label>
        {info.type !== "full" && (
          <label>
            Cantidad (€)
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </label>
        )}
        <button className={styles.confirm} onClick={submit}>
          Confirmar
        </button>
      </div>
    </div>
  );
}
