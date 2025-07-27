const { google } = require('googleapis');
const credentials = require('../lib/credentials.json');

// Configuración
const SPREADSHEET_ID = '1rgGrfunJiwQ20xBILmKhMMF8t2ZHaAkA2punfdBihXg';
const GIFT_ID = 1; // ID del regalo para probar
const CONTRIBUTION_AMOUNT = 50; // Cantidad de la contribución
const CONTRIBUTOR_NAME = 'Prueba desde Script';

async function testContribution() {
  try {
    console.log('🔍 Iniciando prueba de contribución...');
    
    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // 1. Verificar que existe la hoja de Contribuciones
    console.log('📋 Verificando hoja de Contribuciones...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
      fields: 'sheets(properties(title,sheetId))',
    });
    
    const contribSheet = spreadsheet.data.sheets.find(
      sheet => sheet.properties.title === 'Contribuciones'
    );
    
    if (!contribSheet) {
      console.log('❌ No se encontró la hoja "Contribuciones". Creándola...');
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: {
          requests: [{
            addSheet: {
              properties: {
                title: 'Contribuciones',
                gridProperties: {
                  rowCount: 1,
                  columnCount: 5
                }
              }
            }
          }]
        }
      });
      
      // Establecer encabezados
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Contribuciones!A1:E1',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [
            ['ID', 'Gift ID', 'Nombre', 'Cantidad', 'Fecha']
          ]
        }
      });
      
      console.log('✅ Hoja "Contribuciones" creada con éxito');
    }
    
    // 2. Añadir contribución de prueba
    console.log('\n💳 Añadiendo contribución de prueba...');
    const timestamp = new Date().toISOString();
    
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Contribuciones',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [
            `=ROW()-1`, // ID autoincremental
            GIFT_ID,
            CONTRIBUTOR_NAME,
            CONTRIBUTION_AMOUNT,
            `=NOW()`
          ]
        ]
      }
    });
    
    console.log('✅ Contribución añadida con éxito');
    console.log('📊 Actualizando total contribuido...');
    
    // 3. Actualizar el total contribuido en la hoja Regalos
    // Primero obtenemos el valor actual
    const giftResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Regalos!A${GIFT_ID + 1}:G${GIFT_ID + 1}`,
    });
    
    const giftRow = giftResponse.data.values[0];
    const currentContributed = parseFloat(giftRow[6] || '0');
    const newContributed = currentContributed + CONTRIBUTION_AMOUNT;
    
    // Actualizamos el valor
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `Regalos!G${GIFT_ID + 1}`, // +1 porque la primera fila son encabezados
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[newContributed]]
      }
    });
    
    console.log('✅ Total contribuido actualizado');
    console.log(`\n🎉 ¡Prueba completada con éxito!`);
    console.log(`📌 Se ha añadido una contribución de ${CONTRIBUTION_AMOUNT}€ al regalo con ID ${GIFT_ID}`);
    
  } catch (error) {
    console.error('\n❌ Error en la prueba de contribución:');
    console.error('Mensaje:', error.message);
    
    if (error.response) {
      console.error('\nDetalles del error:', JSON.stringify(error.response.data, null, 2));
    }
    
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Verifica que la cuenta de servicio tenga permisos de escritura');
    console.log('2. Revisa que el ID de la hoja de cálculo sea correcto');
    console.log('3. Asegúrate de que la hoja "Regalos" tenga la estructura correcta');
  }
}

testContribution();
