const { getSheets } = require('../lib/auth');
const { GOOGLE_SHEETS_ID } = require('../config');
const fs = require('fs').promises;

async function loadGifts() {
  try {
    // Leer los datos de gifts.json
    const giftsData = require('../public/gifts.json');
    
    // Obtener Sheets API
    const sheets = await getSheets();

    // Limpiar la hoja Regalos
    console.log('Limpiando hoja Regalos...');
    await sheets.spreadsheets.values.clear({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Regalos!A1:G100'
    });

    // Limpiar la hoja Contribuciones
    console.log('Limpiando hoja Contribuciones...');
    await sheets.spreadsheets.values.clear({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Contribuciones!A1:E1000'
    });

    // Crear encabezados
    const headers = ['id', 'name', 'description', 'price', 'image', 'link', 'contributed'];
    
    // Preparar datos de los regalos
    const gifts = giftsData.gifts.map(gift => [
      gift.id,
      gift.name,
      gift.description,
      gift.price,
      gift.image,
      gift.link,
      gift.contributed || 0
    ]);

    // Escribir encabezados
    console.log('Escribiendo encabezados...');
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Regalos!A1:G1',
      valueInputOption: 'RAW',
      resource: {
        values: [headers]
      }
    });

    // Escribir datos de los regalos
    console.log('Escribiendo datos de los regalos...');
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Regalos!A2:G100',
      valueInputOption: 'RAW',
      resource: {
        values: gifts
      }
    });

    console.log('¡Regalos cargados exitosamente!');
    console.log(`Se han cargado ${gifts.length} regalos`);

    // Verificar que los datos se cargaron correctamente
    console.log('\nVerificando datos...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Regalos!A1:G100'
    });
    
    const values = response.data.values;
    console.log(`Registros en la hoja: ${values.length - 1}`);
    console.log('Primer regalo:', values[1]);

  } catch (error) {
    console.error('Error al cargar regalos:', error);
  }
}

loadGifts();
