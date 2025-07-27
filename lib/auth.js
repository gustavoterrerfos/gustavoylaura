const { google } = require('googleapis');
const { GOOGLE_SHEETS_ID } = require('../config');
const fs = require('fs').promises;

// Cargar credenciales desde archivo
async function loadCredentials() {
  try {
    const credentialsPath = process.env.NODE_ENV === 'production' 
      ? '/lib/credentials.json' 
      : './lib/credentials.json';
    
    const credentials = await fs.readFile(credentialsPath, 'utf8');
    return JSON.parse(credentials);
  } catch (error) {
    console.error('Error loading credentials:', error);
    throw new Error('No se pudieron cargar las credenciales');
  }
}

// Configuración de la autenticación
async function getAuthenticatedClient() {
  try {
    const credentials = await loadCredentials();
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
    throw new Error('Error en la autenticación con Google Sheets');
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
