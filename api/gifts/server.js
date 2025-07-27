import { getGifts, addContribution } from '../../../lib/google-sheets';

export default async function handler(req) {
  try {
    if (req.method === 'GET') {
      const gifts = await getGifts();
      if (!gifts || !Array.isArray(gifts)) {
        throw new Error('No se pudieron obtener los regalos');
      }
      return new Response(JSON.stringify({ gifts }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const { giftId, name, message, amount } = body;
      
      // Validar los datos
      if (!giftId || !name || !amount) {
        return new Response(JSON.stringify({ error: 'Faltan datos requeridos' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Convertir amount a número
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        return new Response(JSON.stringify({ error: 'Cantidad inválida' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Registrar la contribución
      const result = await addContribution(giftId, name, message, numericAmount);
      if (!result) {
        throw new Error('Error al registrar la contribución');
      }
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en server.js:', error.message);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
