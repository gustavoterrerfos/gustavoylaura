const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

async function checkSheet() {
  try {
    console.log('Conectando a Google Sheets...');
    
    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Crear cliente de Sheets
    const sheets = google.sheets({ version: 'v4', auth });

    // Verificar la hoja de regalos
    console.log('\nVerificando hoja "Regalos"...');
    const giftsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Regalos!A1:G10',
    });

    const giftsData = giftsResponse.data.values || [];
    console.log('\nContenido de la hoja "Regalos":');
    console.table(giftsData);

    // Verificar la hoja de contribuciones
    console.log('\nVerificando hoja "Contribuciones"...');
    const contribsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Contribuciones!A1:E10',
    });

    const contribsData = contribsResponse.data.values || [];
    console.log('\nContenido de la hoja "Contribuciones":');
    console.table(contribsData);

    console.log('\nVerificación completada con éxito.');
  } catch (error) {
    console.error('\nError durante la verificación:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('\nDetalles del error:');
      console.error('Código de estado:', error.response.status);
      console.error('Datos de respuesta:', error.response.data);
    }
  }
}

checkSheet();
