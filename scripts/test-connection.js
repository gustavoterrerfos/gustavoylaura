const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

async function testConnection() {
  try {
    console.log('Iniciando prueba de conexión...');
    
    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('Autenticando con Google...');
    const authClient = await auth.getClient();
    console.log('Autenticación exitosa');

    // Obtener el token de acceso
    const token = await authClient.getAccessToken();
    console.log('Token de acceso obtenido');

    // Crear cliente de Sheets
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    console.log('\nListando hojas del documento...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      includeGridData: false,
    });

    console.log('\nHojas en el documento:');
    spreadsheet.data.sheets.forEach(sheet => {
      console.log(`- ${sheet.properties.title} (ID: ${sheet.properties.sheetId})`);
    });

  } catch (error) {
    console.error('\nError en la prueba de conexión:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('\nDetalles del error:');
      console.error('Código de estado:', error.response.status);
      console.error('Datos de respuesta:', error.response.data);
    }
    
    if (error.code) {
      console.error('Código de error:', error.code);
    }
  }
}

testConnection();
