const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

async function checkGiftIds() {
  try {
    console.log('Conectando a Google Sheets...');
    
    // Configurar autenticación
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Crear cliente de Sheets
    const sheets = google.sheets({ version: 'v4', auth });

    // Obtener los IDs de los regalos
    console.log('Obteniendo IDs de regalos...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Regalos!A2:A10',
      valueRenderOption: 'UNFORMATTED_VALUE'
    });

    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      console.log('No se encontraron regalos en la hoja');
      return;
    }

    console.log('\nIDs de regalos encontrados:');
    rows.forEach((row, index) => {
      console.log(`Fila ${index + 2}:`, row[0], `(tipo: ${typeof row[0]})`);
    });

    // Verificar también la primera fila para ver los encabezados
    const headersResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Regalos!1:1',
      valueRenderOption: 'UNFORMATTED_VALUE'
    });

    console.log('\nEncabezados de la hoja Regalos:');
    console.log(headersResponse.data.values ? headersResponse.data.values[0] : 'No se encontraron encabezados');

  } catch (error) {
    console.error('\nError al verificar los IDs:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
  }
}

checkGiftIds();
