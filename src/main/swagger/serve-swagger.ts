import { Express } from 'express';
import path from 'path';
import fs from 'fs';
import { swaggerSpec } from './swagger';

export const setupSwagger = (app: Express): void => {
  // Serve o arquivo JSON do Swagger
  app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Serve a página HTML personalizada
  app.get('/api-docs', (req, res) => {
    const filePath = path.join(__dirname, './swagger-ui.html');
    
    // Verifica se o arquivo existe
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      // Fallback caso o arquivo não exista
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>aiCoach API Documentation</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js"></script>
        
        <script>
          window.onload = function() {
            const ui = SwaggerUIBundle({
              url: "/api-docs/swagger.json",
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "BaseLayout"
            });
            window.ui = ui;
          };
        </script>
      </body>
      </html>
      `;
      res.type('html').send(htmlContent);
    }
  });
}; 