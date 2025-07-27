const { google } = require('googleapis');
const { GOOGLE_SHEETS_ID } = require('../config');
const fs = require('fs').promises;

async function loadCredentials() {
  const credentials = await fs.readFile('./lib/credentials.json', 'utf8');
  return JSON.parse(credentials);
}

async function checkPermissions() {
  try {
    const credentials = await loadCredentials();
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Verificar acceso al documento
    console.log('Verificando acceso al documento...');
    const response = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEETS_ID
    });

    console.log('Documento encontrado:', response.data.properties.title);
    console.log('URL del documento:', `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_ID}`);

    const serviceAccountEmail = credentials.client_email;
    console.log('Correo de la cuenta de servicio:', serviceAccountEmail);

    console.log('¡El script ha completado su ejecución!');
    console.log('Para completar la configuración, necesitas:');
    console.log('1. Ir a Google Cloud Console');
    console.log('2. Seleccionar el proyecto gus-y-lau-boda');
    console.log('3. Ir a APIs y servicios > Credenciales');
    console.log('4. Encontrar la cuenta de servicio y editar sus permisos');
    console.log('5. Agregar el scope: https://www.googleapis.com/auth/drive.readonly');
    console.log('6. Compartir el documento de Sheets con:', serviceAccountEmail);

  } catch (error) {
    console.error('Error al verificar permisos:', error);
    throw error;
  }
}

checkPermissions();
