const express = require('express');
const router = express.Router();




const mongoAPI = require('./utils/mongo');
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.use('/users', require('./utils/users'));
router.use('/tasks', require('./utils/tasks'));

module.exports = router;