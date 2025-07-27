const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

async function testAuth() {
  try {
    console.log('Iniciando prueba de autenticación...');
    
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

    console.log('Intentando acceder a la hoja de cálculo...');
    const response = await sheets.spreadsheets.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      fields: 'spreadsheetId,properties.title',
    });

    console.log('\nAcceso exitoso a la hoja de cálculo:');
    console.log('ID:', response.data.spreadsheetId);
    console.log('Título:', response.data.properties.title);
  } catch (error) {
    console.error('\nError durante la prueba de autenticación:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('\nDetalles del error:');
      console.error('Código de estado:', error.response.status);
      console.error('Datos de respuesta:', error.response.data);
    }
    
    if (error.code) {
      console.error('Código de error:', error.code);
    }
    
    if (error.errors) {
      console.error('Errores:', JSON.stringify(error.errors, null, 2));
    }
  }
}

testAuth();
