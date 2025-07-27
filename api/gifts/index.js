import { json } from 'stream/consumers';
import { getGifts, addContribution } from '../../../lib/google-sheets';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    if (req.method === 'GET') {
      const response = await fetch('/api/gifts/server');
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const body = await json(req);
      const response = await fetch('/api/gifts/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default async function handler(req) {
  try {
    if (req.method === 'GET') {
      const { gifts } = await readGifts();
      return new Response(JSON.stringify({ gifts }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      const { gifts } = await readGifts();
      const { giftId, name, message, amount } = await json(req);
      
      const gift = gifts.find(g => g.id === giftId);
      if (!gift) {
        return new Response(JSON.stringify({ error: 'Gift not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const newContributed = Math.min(gift.price, gift.contributed + amount);
      gift.contributed = newContributed;
      gift.contributors.push({
        name,
        message: message || '',
        amount,
        timestamp: new Date().toISOString(),
      });

      await writeGifts({ gifts });

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
