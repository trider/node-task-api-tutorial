const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Task API',
      version: '1.0.0',
      description: 'API Documentation for Node Task API',
    },
  },
  apis: ['./*.js', './utils/*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);


module.exports = swaggerSpec;