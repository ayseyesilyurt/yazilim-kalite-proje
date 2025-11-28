const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yazılım Kalite REST API',
      version: '1.0.0',
      description: 'Users, Categories, Products, Orders, OrderItems için basit REST API'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // JSDoc yorumlarını buradan okuyacak
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;