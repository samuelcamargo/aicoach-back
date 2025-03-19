import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'aiCoach API',
    version: '1.0.0',
    description: 'API para o sistema aiCoach',
    contact: {
      name: 'aiCoach Support',
      email: 'support@aicoach.com'
    }
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://aicoach-back.vercel.app'
        : 'http://localhost:3000',
      description: process.env.NODE_ENV === 'production' 
        ? 'Servidor de produção' 
        : 'Servidor de desenvolvimento'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/main/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options); 