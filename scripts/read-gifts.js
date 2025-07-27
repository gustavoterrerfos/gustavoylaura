const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

async function readGifts() {
  try {
    console.log('🔍 Conectando a Google Sheets...');
    
    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Crear cliente de Google Sheets
    const sheets = google.sheets({ version: 'v4', auth });
    
    // 1. Obtener encabezados
    console.log('📋 Obteniendo encabezados...');
    const headersResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Regalos!1:1', // Primera fila (encabezados)
    });
    
    const headers = headersResponse.data.values ? headersResponse.data.values[0] : [];
    console.log('\n📝 Encabezados:', headers);
    
    // 2. Obtener los primeros 5 registros
    console.log('\n📊 Obteniendo registros...');
    const valuesResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Regalos!A2:Z10', // Primeras 9 filas de datos (empezando desde la fila 2)
    });
    
    const rows = valuesResponse.data.values || [];
    
    console.log('\n📦 Registros encontrados:', rows.length);
    
    // Mostrar los registros formateados
    if (rows.length > 0) {
      console.log('\n📋 Contenido de la hoja:');
      console.log('-----------------------');
      
      // Mostrar encabezados
      console.log(headers.join(' | '));
      console.log('-'.repeat(50));
      
      // Mostrar filas
      rows.forEach((row, index) => {
        // Asegurarse de que cada fila tenga la misma longitud que los encabezados
        const formattedRow = headers.map((_, i) => row[i] || '');
        console.log(`Fila ${index + 2}:`, formattedRow.join(' | '));
      });
    } else {
      console.log('No se encontraron registros en la hoja.');
    }
    
    console.log('\n✅ Proceso completado');
    
  } catch (error) {
    console.error('\n❌ Error al leer la hoja:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('\nDetalles del error:', JSON.stringify(error.response.data, null, 2));
    }
    
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Verifica que la hoja "Regalos" existe en el documento');
    console.log('2. Asegúrate de que la cuenta de servicio tenga permisos de lectura');
    console.log('3. Revisa que el ID de la hoja de cálculo sea correcto');
  }
}

readGifts();
