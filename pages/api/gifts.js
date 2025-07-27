// Datos estáticos de regalos
const giftsData = {
  gifts: [
    {
      id: 1,
      name: "Hegas – Mueble TV 180 natural",
      description: "Mueble de TV 180 cm en acabado natural.",
      image: "/images/Mueble Televisor.jpg",
      price: 330.65,
      contributed: 0,
      link: "https://kenayhome.com/es/17438-hegas-mueble-tv-180-natural.html?utm_source=Connectif&utm_medium=carrusel&utm_campaign=productosRecomendados",
      contributors: []
    },
    {
      id: 2,
      name: "Sound – Sofá personalizable",
      description: "Sofá chaise longue mediana izquierda personalizable.",
      image: "/images/Sofa.jpg",
      price: 1599,
      contributed: 0,
      link: "https://kenayhome.com/es/15124-sound-sofa-chaise-mediana-izquierda.html",
      contributors: []
    },
    {
      id: 3,
      name: "Kolb – Zapatero natural",
      description: "Mueble zapatero acabado natural.",
      image: "/images/Zapatero.jpg",
      price: 219,
      contributed: 0,
      link: "https://kenayhome.com/es/17436-kolb-zapatero-natural.html",
      contributors: []
    },
    {
      id: 4,
      name: "Lena – Espejo negro",
      description: "Espejo decorativo acabado negro.",
      image: "/images/espejo.jpg",
      price: 199,
      contributed: 0,
      link: "https://kenayhome.com/es/15288-lena-espejo-negro.html",
      contributors: []
    },
    {
      id: 5,
      name: "Nais – Pack 2 taburetes gris",
      description: "Pack de 2 taburetes tapizados en gris.",
      image: "/images/Taburete.jpg",
      price: 159.8,
      contributed: 0,
      link: "https://kenayhome.com/es/19120-nais-taburete-tapizado-gris.html",
      contributors: []
    },
    {
      id: 7,
      name: "Low – Silla tapizada gris",
      description: "Silla tapizada en gris con patas de madera.",
      image: "/images/Silla.jpg",
      price: 129,
      contributed: 0,
      link: "https://kenayhome.com/es/18165-low-silla-tapizada-gris.html",
      contributors: []
    },
    {
      id: 8,
      name: "Wavea – Lámpara techo Ø50",
      description: "Lámpara de techo beige 50 cm.",
      image: "/images/lampara-de-techo.jpg",
      price: 109,
      contributed: 0,
      link: "https://www.maisonsdumonde.com/ES/es/p/lampara-de-techo-beige-d-50-wavea-238956.htm",
      contributors: []
    }
  ]
};

// API Route de Next.js
export default function handler(req, res) {
  console.log('Solicitud recibida en /api/gifts', { method: req.method });
  
  if (req.method === 'GET') {
    try {
      console.log('Procesando solicitud GET para /api/gifts');
      
      // Verificar que los datos estén presentes
      if (!giftsData || !giftsData.gifts) {
        console.error('Error: No se encontraron datos de regalos');
        return res.status(500).json({ 
          error: 'Error interno del servidor',
          details: 'No se encontraron datos de regalos'
        });
      }
      
      console.log(`Devolviendo ${giftsData.gifts.length} regalos`);
      
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(giftsData);
      
    } catch (error) {
      console.error('Error en la API de regalos:', {
        message: error.message,
        stack: error.stack,
        error: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
      
      return res.status(500).json({ 
        error: 'Error al obtener los regalos',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
  
  // Si el método no es GET
  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ 
    error: `Método ${req.method} no permitido`,
    allowed: ['GET']
  });
}
