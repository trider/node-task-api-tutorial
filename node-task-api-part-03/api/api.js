const express = require('express');
const router = express.Router();

router.use('/users', require('./utils/users'));
router.use('/tasks', require('./utils/tasks'));

router.get('/', (req, res) => {
    res.redirect('/api/users');
});



module.exports = router;