import { getSheets } from './auth';
import { GOOGLE_SHEETS_ID } from '../config';

// Configuración de las hojas
const SHEETS_CONFIG = {
  GIFTS: {
    sheetName: 'Regalos',
    range: 'A1:G100', // Ajustar según necesidad
    columns: ['id', 'name', 'description', 'price', 'image', 'link', 'contributed']
  },
  CONTRIBUTIONS: {
    sheetName: 'Contribuciones',
    range: 'A1:E1000', // Ajustar según necesidad
    columns: ['giftId', 'name', 'message', 'amount', 'timestamp']
  }
};

async function getGifts() {
  try {
    const sheets = await getSheets();
    
    // Verificar que la hoja existe
    const sheetMetadata = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      ranges: [SHEETS_CONFIG.GIFTS.sheetName]
    });
    
    if (!sheetMetadata.data.sheets?.some(sheet => 
      sheet.properties?.title === SHEETS_CONFIG.GIFTS.sheetName)) {
      throw new Error('No se encontró la hoja de regalos');
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: SHEETS_CONFIG.GIFTS.range,
      valueRenderOption: 'UNFORMATTED_VALUE', // Obtener valores sin formato
      dateTimeRenderOption: 'FORMATTED_STRING'
    });
    
    const rows = response.data.values;
    
    // Verificar que hay encabezados
    if (!rows || rows.length < 2) {
      throw new Error('No se encontraron regalos en la hoja');
    }

    const headers = rows[0];
    if (headers.some((header, i) => header !== SHEETS_CONFIG.GIFTS.columns[i])) {
      throw new Error('Los encabezados de la hoja no coinciden con los esperados');
    }

    // Obtener los IDs de los regalos para verificar duplicados
    const giftIds = new Set();
    
    const gifts = rows.slice(1).map((row, index) => {
      // Saltar filas vacías
      if (row.every(cell => cell === '' || cell === null || cell === undefined)) {
        return null;
      }
      
      const gift = {};
      headers.forEach((header, i) => {
        gift[header] = row[i] !== undefined ? row[i] : '';
      });
      
      // Verificar que el ID es único
      if (giftIds.has(gift.id)) {
        throw new Error(`ID duplicado encontrado: ${gift.id}`);
      }
      giftIds.add(gift.id);
      
      // Convertir a números
      if (gift.price) {
        const priceStr = gift.price.toString().trim();
        gift.price = parseFloat(priceStr.replace(',', '.')) || 0;
      } else {
        gift.price = 0;
      }
      
      if (gift.contributed) {
        const contributedStr = gift.contributed.toString().trim();
        gift.contributed = parseFloat(contributedStr.replace(',', '.')) || 0;
      } else {
        gift.contributed = 0;
      }
      
      // Calcular el porcentaje contribuido
      gift.contributionPercentage = gift.price > 0 
        ? Math.min(100, Math.round((gift.contributed / gift.price) * 100)) 
        : 0;
      
      return gift;
    }).filter(gift => gift !== null); // Filtrar filas vacías
    
    return gifts;
  } catch (error) {
    console.error('Error en getGifts:', error);
    throw new Error('Error al obtener los regalos: ' + error.message);
  }
}

async function addContribution(giftId, name, message, amount) {
  try {
    // Validar entrada
    if (!giftId || !name || !amount) {
      throw new Error('Faltan datos requeridos para la contribución');
    }
    
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('Cantidad inválida para la contribución');
    }

    const sheets = await getSheets();
    const timestamp = new Date().toISOString();
    
    // Verificar que la hoja de contribuciones existe
    try {
      await sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEETS_ID,
        ranges: [SHEETS_CONFIG.CONTRIBUTIONS.sheetName]
      });
    } catch (error) {
      if (error.code === 400) {
        // Crear la hoja de contribuciones si no existe
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: GOOGLE_SHEETS_ID,
          resource: {
            requests: [{
              addSheet: {
                properties: {
                  title: SHEETS_CONFIG.CONTRIBUTIONS.sheetName,
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 5
                  }
                }
              }
            }]
          }
        });
        
        // Añadir encabezados
        await sheets.spreadsheets.values.update({
          spreadsheetId: GOOGLE_SHEETS_ID,
          range: `${SHEETS_CONFIG.CONTRIBUTIONS.sheetName}!A1:E1`,
          valueInputOption: 'RAW',
          resource: {
            values: [SHEETS_CONFIG.CONTRIBUTIONS.columns]
          }
        });
      } else {
        throw error;
      }
    }

    // Obtener los regalos para encontrar la fila correcta
    const giftsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: SHEETS_CONFIG.GIFTS.range,
      valueRenderOption: 'UNFORMATTED_VALUE'
    });
    
    const rows = giftsResponse.data.values || [];
    if (rows.length < 2) {
      throw new Error('No se encontraron regalos en la hoja');
    }
    
    // Buscar el regalo por ID
    const giftIndex = rows.findIndex((row, index) => index > 0 && row[0] === giftId);
    if (giftIndex === -1) {
      throw new Error(`No se encontró el regalo con ID ${giftId}`);
    }
    
    const giftRow = rows[giftIndex];
    const headers = rows[0];
    const gift = {};
    
    // Crear objeto con los datos del regalo
    headers.forEach((header, index) => {
      gift[header] = giftRow[index] !== undefined ? giftRow[index] : '';
    });
    
    // Convertir a números
    const currentContributed = gift.contributed 
      ? parseFloat(gift.contributed.toString().replace(',', '.')) || 0 
      : 0;
    
    const giftPrice = gift.price 
      ? parseFloat(gift.price.toString().replace(',', '.')) || 0 
      : 0;
    
    const newContributed = currentContributed + numericAmount;
    
    // Verificar que no se exceda el precio
    if (newContributed > giftPrice) {
      throw new Error(`La contribución excede el precio del regalo (máximo permitido: ${giftPrice - currentContributed}€)`);
    }
    
    // Registrar la contribución
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: `${SHEETS_CONFIG.CONTRIBUTIONS.sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[giftId, name, message, numericAmount, timestamp]]
      }
    });
    
    // Actualizar el campo contributed en la hoja de regalos
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: `Regalos!G${giftIndex + 1}`, // +1 porque el índice empieza en 0 pero las filas en 1
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[newContributed]]
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error adding contribution:', error);
    throw new Error('Error al registrar la contribución: ' + error.message);
  }
}

module.exports = {
  getGifts,
  addContribution
};
