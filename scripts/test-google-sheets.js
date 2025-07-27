const { getSheets } = require('../lib/auth');
const { GOOGLE_SHEETS_ID } = require('../config');

async function testGoogleSheets() {
  try {
    // Obtener Sheets API
    const sheets = await getSheets();
    
    // 1. Leer datos de la hoja Regalos
    console.log('1. Leyendo datos de la hoja Regalos...');
    const giftsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Regalos!A1:G100'
    });
    
    const gifts = giftsResponse.data.values;
    console.log(`Regalos encontrados: ${gifts.length - 1}`);
    console.log('Primer regalo:', gifts[1]);

    // 2. Escribir una contribución de prueba
    console.log('\n2. Escribiendo contribución de prueba...');
    const testContribution = {
      giftId: '1',
      name: 'Test User',
      message: 'Contribución de prueba',
      amount: 10,
      timestamp: new Date().toISOString()
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Contribuciones!A1:E1000',
      valueInputOption: 'RAW',
      resource: {
        values: [[
          testContribution.giftId,
          testContribution.name,
          testContribution.message,
          testContribution.amount,
          testContribution.timestamp
        ]]
      }
    });

    console.log('Contribución de prueba escrita exitosamente');

    // 3. Verificar contribución en la hoja Regalos
    console.log('\n3. Verificando actualización del regalo...');
    const updatedGiftsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Regalos!A1:G100'
    });

    const updatedGifts = updatedGiftsResponse.data.values;
    const firstGift = updatedGifts[1];
    console.log('Estado actual del primer regalo:', firstGift);

    console.log('\n¡Prueba completada exitosamente!');
  } catch (error) {
    console.error('Error en la prueba:', error);
  }
}

testGoogleSheets();
