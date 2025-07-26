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
  {
    id: 2,
    name: "Sound – Sofá personalizable (chaise mediana izquierda)",
    description: "Sofá modular cómodo con chaise longue mediana izquierda.",
    image: "/images/gifts/sound-sofa.jpg",
    price: 1199,
    contributed: 0,
    link: "https://kenayhome.com/es/13390-94931-sound-sofa-personalizable.html#/2772-astor_sofa_tamanos-sofa_chaise_mediana_izquierda/3844-colores_tapizados-hada_perla",
  },
  {
    id: 3,
    name: "Kolb – Zapatero natural",
    description: "Zapatero estilo natural para mantener el orden.",
    image: "/images/gifts/kolb-zapatero.jpg",
    price: 269,
    contributed: 0,
    link: "https://kenayhome.com/es/16355-kolb-zapatero-natural.html",
  },
  {
    id: 4,
    name: "Lena – Espejo negro",
    description: "Espejo decorativo acabado negro.",
    image: "/images/gifts/lena-espejo.jpg",
    price: 199,
    contributed: 0,
    link: "https://kenayhome.com/es/15288-lena-espejo-negro.html",
  },
  {
    id: 5,
    name: "Nais – Pack 2 taburetes tapizados gris",
    description: "Taburetes tapizados en gris para la cocina.",
    image: "/images/gifts/nais-taburetes.jpg",
    price: 159.8,
    contributed: 0,
    link: "https://kenayhome.com/es/19851-nais-pack-2-taburetes-tapizados-gris.html",
  },
  {
    id: 6,
    name: "Low – Pack 2 sillas tapizadas gris claro (4 packs)",
    description: "Necesitamos 8 sillas (4 packs de 2). Precio total mostrado.",
    image: "/images/gifts/low-sillas.jpg",
    price: 639.6,
    contributed: 0,
    link: "https://kenayhome.com/es/19642-low-pack-2-sillas-tapizadas-gris-claro.html?utm_source=Connectif&utm_medium=carrusel&utm_campaign=productosRecomendados",
  },
  {
    id: 7,
    name: "Crate – Puf personalizable",
    description: "Puf personalizable para mayor confort.",
    image: "/images/gifts/crate-puf.jpg",
    price: 299,
    contributed: 0,
    link: "https://kenayhome.com/es/17689-95664-crate-puf-personalizable.html#/4343-colores_tapizados-kyrios_6_beige",
  },
  {
    id: 8,
    name: "Wavea – Lámpara de techo beige D.50",
    description: "Lámpara de techo estilo natural diámetro 50 cm.",
    image: "/images/gifts/wavea-lampara.jpg",
    price: 44.99,
    contributed: 0,
    link: "https://www.maisonsdumonde.com/ES/es/p/lampara-de-techo-beige-d-50-wavea-238956.htm",
  },
];

export default function GiftList() {
  const [gifts, setGifts] = useState(initialGifts);
  const [modalInfo, setModalInfo] = useState(null); // {giftId, type}

  const openModal = (giftId, type) => setModalInfo({ giftId, type });
  const closeModal = () => setModalInfo(null);

  const handleConfirm = (name, message, amount) => {
    setGifts((prev) =>
      prev.map((g) =>
        g.id === modalInfo.giftId
          ? { ...g, contributed: Math.min(g.price, g.contributed + amount) }
          : g
      )
    );
    closeModal();
  };

  return (
    <div className={styles.grid}>
      {gifts.map((gift) => {
        const progress = Math.min(100, (gift.contributed / gift.price) * 100);
        const remaining = Math.max(0, gift.price - gift.contributed);
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
              <button onClick={() => openModal(gift.id, "full")}>Regalar completo</button>
              <button onClick={() => openModal(gift.id, "partial")}>Aportar parte</button>
              <a href={gift.link} target="_blank" rel="noopener noreferrer">
                Ver en tienda
              </a>
            </div>
          </div>
        );
      })}

}

        <h3>Transferencia directa</h3>
        <p>Si prefieres, puedes realizar una transferencia a la siguiente cuenta:</p>
        <div className={styles.bank}>ES82 0186 5001 61 0525696201</div>
        <button onClick={() => openModal(null, "transfer")}>Aportar</button>
      </div>

      {modalInfo && (
        <Modal
          info={modalInfo}
          gift={gifts.find((g) => g.id === modalInfo.giftId)}
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
    info.type === "full" ? gift.price - gift.contributed : 0
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
        {gift && <p>{gift.name}</p>}
        <label>
          Tu nombre
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Mensaje opcional
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        {info.type !== "full" && (
          <label>
            Cantidad (€)
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
