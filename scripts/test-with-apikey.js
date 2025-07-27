const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

// Reemplaza esto con tu clave de API
const API_KEY = 'TU_CLAVE_DE_API';

async function testWithAPIKey() {
  try {
    console.log('Iniciando prueba con clave de API...');
    
    // Primero, autenticación con la cuenta de servicio
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Usar la clave de API para la autenticación
    const sheetsWithAPI = google.sheets({ 
      version: 'v4',
      auth: API_KEY
    });

    console.log('Obteniendo información de la hoja...');
    
    // Intentar obtener los valores de la hoja
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Regalos!A1:G10',
      key: API_KEY // Incluir la clave de API
    });

    console.log('\nDatos de la hoja:');
    console.log(response.data.values);
    
  } catch (error) {
    console.error('\nError en la prueba:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
    
    console.error('\nSugerencia: Asegúrate de que:');
    console.log('1. La API de Google Sheets está habilitada');
    console.log('2. La cuenta de servicio tiene permisos de editor en la hoja');
    console.log('3. La clave de API es válida y está correctamente configurada');
  }
}

testWithAPIKey();
