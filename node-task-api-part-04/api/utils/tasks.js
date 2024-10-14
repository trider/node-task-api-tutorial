const express = require('express');
const router = express.Router();

const tasks = require('../data/tasks');

router.get('/:dir?', (req, res) =>{
  if(req.params?.dir===undefined ||req.params.dir === 'asc'){
    res.json(tasks.sort((a, b) => (a.taskId > b.taskId) ? 1 : -1));
  }
  else if(req.params.dir === 'desc'){
    res.json(tasks.sort((a, b) => (a.taskId < b.taskId) ? 1 : -1));
  }
})
router.get('/user/:user', (req, res) =>{
  res.json(tasks.filter(task => task.user === req.params.user));
})

router.get('/task/:taskId', (req, res) =>{
  res.json(tasks.find(task => task.taskId === parseInt(req.params.taskId)));
})

router.post('/add', (req, res) =>{
  tasks.push(req.body);
  res.json({
    ...req.body,
    message: 'Task added successfully'});
})

router.put('/update/:taskId', (req, res) =>{
  tasks.map(task => {
    if(task.taskId === parseInt(req.params.taskId)){
      task = req.body;
    }
  });
  res.json({
    ...req.body,
    message: 'Task updated successfully'});
})

router.delete('/delete/:taskId', (req, res) =>{
  res.json(tasks.filter(task => task.taskId !== parseInt(req.params.taskId)));
})

module.exports = router;