# Configuración de Google Sheets

1. **Crear proyecto en Google Cloud Platform**
   - Ve a https://console.cloud.google.com/
   - Crea un nuevo proyecto
   - Habilita la API de Google Sheets

2. **Crear credenciales**
   - Ve a "APIs y servicios" > "Credenciales"
   - Haz clic en "Crear credenciales" > "Credenciales de servicio"
   - Selecciona la cuenta de servicio
   - Selecciona "Proyecto de servicio"
   - Selecciona "Editor" como rol
   - Haz clic en "Crear y continuar"
   - Descarga el archivo JSON de credenciales

3. **Compartir el Google Sheet**
   - Ve a tu Google Sheet
   - Haz clic en "Compartir"
   - Agrega el correo de la cuenta de servicio
   - Selecciona "Editor" como permiso

4. **Configurar el proyecto**
   - Instala las dependencias:
   ```bash
   npm install googleapis
   ```

   - Copia el archivo JSON de credenciales a la carpeta `lib` como `credentials.json`

   - Asegúrate de que el ID del Google Sheet en `config.js` sea correcto
