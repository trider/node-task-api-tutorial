const express = require('express');
const router = express.Router();


const mongoAPI = require('./utils/mongo');
router.use('/users', require('./utils/users'));
router.use('/user', require('./utils/user'));
router.use('/tasks', require('./utils/tasks'));

module.exports = router;