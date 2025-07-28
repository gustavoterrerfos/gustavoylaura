const { google } = require('googleapis');
const { GOOGLE_SHEETS_ID } = require('../config');

// Configuración de la autenticación
async function getAuthenticatedClient() {
  try {
    // Usar variables de entorno para las credenciales
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
      universe_domain: 'googleapis.com'
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.readonly'
      ],
    });
    
    const client = await auth.getClient();
    
    // Verificar si la autenticación fue exitosa
    if (!client) {
      throw new Error('No se pudo obtener el cliente de autenticación');
    }
    
    return client;
  } catch (error) {
    console.error('Error en la autenticación:', error);
    throw new Error('Error en la autenticación con Google Sheets: ' + error.message);
  }
}

// Obtener Sheets API con autenticación
async function getSheets() {
  try {
    const client = await getAuthenticatedClient();
    if (!client) {
      throw new Error('No se pudo obtener el cliente de autenticación');
    }
    
    const sheets = google.sheets({ version: 'v4', auth: client });
    
    // Verificar si la conexión con Sheets es válida
    try {
      await sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEETS_ID
      });
      return sheets;
    } catch (error) {
      console.error('Error al verificar conexión con Sheets:', error);
      throw new Error('No se pudo conectar con el Google Sheet');
    }
  } catch (error) {
    console.error('Error al obtener Sheets API:', error);
    throw error;
  }
}

module.exports = { getSheets };
