import { getGifts, addContribution } from '../../../lib/google-sheets';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req, res) {
  console.log('Solicitud recibida:', req.method, req.url);
  try {
    if (req.method === 'GET') {
      console.log('Obteniendo lista de regalos...');
      const gifts = await getGifts();
      console.log('Regalos obtenidos:', gifts);
      
      if (!gifts || !Array.isArray(gifts)) {
        console.error('No se pudieron obtener los regalos o el formato es incorrecto');
        throw new Error('No se pudieron obtener los regalos');
      }
      
      console.log('Enviando respuesta con', gifts.length, 'regalos');
      return res.status(200).json({ gifts });
    }

    if (req.method === 'POST') {
      // Parse the request body
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { giftId, name, message, amount } = body;
      
      // Validar los datos
      if (!giftId || !name || !amount) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }

      // Convertir amount a número
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ error: 'Cantidad inválida' });
      }

      // Registrar la contribución
      const result = await addContribution(giftId, name, message, numericAmount);
      if (!result) {
        throw new Error('Error al registrar la contribución');
      }
      
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
