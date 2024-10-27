const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const api = require('./api/api');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    './api/api.js',
    './api/modules/users.js',
    './api/modules/tasks.js'
  
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next();
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;