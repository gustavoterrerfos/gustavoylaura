const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

async function verifyAuth() {
  try {
    console.log('🔍 Verificando autenticación...');
    
    // 1. Verificar que el archivo de credenciales existe y es válido
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('❌ El archivo de credenciales no es válido');
    }
    console.log('✅ Archivo de credenciales válido');

    // 2. Crear autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 3. Obtener token de acceso
    console.log('🔑 Obteniendo token de acceso...');
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    
    if (!token) {
      throw new Error('❌ No se pudo obtener el token de acceso');
    }
    console.log('✅ Token de acceso obtenido correctamente');

    // 4. Crear cliente de Google Sheets
    const sheets = google.sheets({ version: 'v4', auth });
    
    // 5. Intentar listar las hojas del documento
    console.log('📋 Intentando listar hojas del documento...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      fields: 'sheets(properties(title,sheetId))',
    });

    console.log('\n📄 Hojas en el documento:');
    spreadsheet.data.sheets.forEach(sheet => {
      console.log(`- ${sheet.properties.title} (ID: ${sheet.properties.sheetId})`);
    });

    console.log('\n🎉 ¡Autenticación exitosa!');
    
  } catch (error) {
    console.error('\n❌ Error en la verificación:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('\nDetalles del error:', error.response.data);
    }
    
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Verifica que la cuenta de servicio tenga acceso a la hoja de cálculo');
    console.log('2. Asegúrate de que la API de Google Sheets esté habilitada');
    console.log('3. Revisa que el ID de la hoja de cálculo sea correcto');
  }
}

verifyAuth();
