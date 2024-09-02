const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./api/swagger');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const api = require('./api/api');





// Simple logging middleware
app.use((req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next(); // Passes control to the next middleware or route handler
});

// Define a route
app.use('/api', api);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});