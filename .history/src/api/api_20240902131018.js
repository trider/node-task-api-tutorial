const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./api/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




const mongoAPI = require('./utils/mongo');

router.use('/users', require('./utils/users'));
router.use('/tasks', require('./utils/tasks'));

module.exports = router;