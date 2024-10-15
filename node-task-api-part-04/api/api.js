const express = require('express');
const router = express.Router();

router.use('/users', require('./modules/users'));
router.use('/tasks', require('./modules/tasks'));

router.get('/', (req, res) => {
    res.redirect('/api/users');
});


module.exports = router;