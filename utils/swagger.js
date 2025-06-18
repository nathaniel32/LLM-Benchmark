const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Saya',
      version: '1.0.0',
      description: 'Dokumentasi API dengan Swagger UI',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./main.js'], // path ke file yang berisi komentar swagger
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };