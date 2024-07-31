import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API IMDB Globo',
      version: '1.0.0',
      description: 'API IMDB Globo',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec };
