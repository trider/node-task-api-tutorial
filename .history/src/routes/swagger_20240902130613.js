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
  apis: ['./*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
export default swaggerDocs

module.exports = swaggerSpec;