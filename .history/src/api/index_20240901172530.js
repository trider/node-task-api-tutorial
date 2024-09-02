const express = require('express');
const router = express.Router();
const users = require('./users');
const tasks = require('./tasks');


router.use('/users', users);
router.use('/tasks', tasks);






//export this router to use in our index.js
module.exports = router;