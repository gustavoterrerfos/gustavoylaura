const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

async function cleanSheet() {
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

    // Limpiar la fila incorrecta en la hoja de Regalos (fila 9)
    console.log('\nLimpiando fila incorrecta en la hoja "Regalos"...');
    await sheets.spreadsheets.values.clear({
      spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
      range: 'Regalos!A9:G9',
    });

    console.log('Fila limpiada correctamente.');

    // Verificar que la hoja de Contribuciones existe
    console.log('\nVerificando hoja "Contribuciones"...');
    try {
      await sheets.spreadsheets.values.get({
        spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
        range: 'Contribuciones!A1',
      });
    } catch (error) {
      if (error.code === 400 && error.message.includes('Unable to parse range')) {
        console.log('La hoja "Contribuciones" no existe. Creando...');
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
          resource: {
            requests: [{
              addSheet: {
                properties: {
                  title: 'Contribuciones',
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
          spreadsheetId: '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg',
          range: 'Contribuciones!A1:E1',
          valueInputOption: 'RAW',
          resource: {
            values: [['giftId', 'name', 'message', 'amount', 'timestamp']]
          }
        });
        
        console.log('Hoja "Contribuciones" creada correctamente con encabezados.');
      } else {
        throw error;
      }
    }

    console.log('\nLimpieza completada con éxito.');
  } catch (error) {
    console.error('\nError durante la limpieza:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('\nDetalles del error:');
      console.error('Código de estado:', error.response.status);
      console.error('Datos de respuesta:', error.response.data);
    }
  }
}

cleanSheet();
