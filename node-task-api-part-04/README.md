Node JS Express for FrontEnd Developers Part Four: Understanding Routing
In Part Three of this series, we explored how to use the Express Frameworks routing capabilities and middleware. We focused on how we could use routing to modularize our code, and how this would make it easier to manage and extend our task management API. In this installment, we will build on this knowledge to further extend the API and add a tasks module. This module will enable us to query and manage tasks. We will also use this opportunity to broaden our knowledge of Javascript and many of its powerful features and methods. As with previous installments, the sample code and files for this installment can be downloaded from GitHub. 
Creating the Tasks List
Before we can create a tasks module, we need to create a list of tasks. In the api/data folder, create a new file called tasks.js.

Open the file, and create a list of tasks in the following format. Note that you can also download the tasks.js file from this installments’s GitHub repo. 
const tasks= [
{
  id: "6630ab326e723ac1ea6dce7a",
  description: "My first task",
  name: "A task",
  taskId: 1,
  user: "jonnygold",
  added: "2024-05-01T22:00:00.000Z",
  updated: "2024-05-01T14:16:01.119Z",
  status: "do",
  isActive: true,
  isEdit: false
},
…
]


module.exports = tasks;

Adding the Task Module
In the api/modules folder create a file called tasks.js. Open the file and add the following:
const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks');


module.exports = router;

In order to create task related routes, we need to add a reference to the tasks modules in api/api.js.
router.use('/users', require('./modules/users'));
router.use('/tasks', require('./modules/tasks'));

Retrieving Tasks
Let’s start by adding a route that returns a list of all tasks. 
router.get('/', (req, res) =>{
  res.json(tasks);
})

You can access this route from GET /api/tasks. For example, if you open http://localhost:3000/api/tasks in a browser, you will see the following:

By default, the list is returned in the same order as the tasks in api/data/tasks.js. Let’s assume that the more recently a task was added, the higher its taskId. So, by default tasks are sorted in ascending order. Let’s add a parameter to the route  that sorts the list by task ID in ascending (asc) or descending (desc) order. We can sort the tasks list with Javascript’s sort method.
router.get('/:dir', (req, res) =>{
 if(req.params.dir === 'asc'){
   res.json(tasks.sort((a, b) => (a.taskId > b.taskId) ? 1 : -1));
 }
 else if(req.params.dir === 'desc'){
   res.json(tasks.sort((a, b) => (a.taskId < b.taskId) ? 1 : -1));
 }
})

Let’s assume that by default we can omit the direction parameter, and tasks are sorted in ascending order. We can do this by appending a question mark to any parameter. We evaluate the code the req object’s params attribute must also be followed by a question mark before the parameter, as shown below.
router.get('/:dir?', (req, res) =>{
 if(req.params?.dir===undefined ||req.params.dir === 'asc'){
   res.json(tasks.sort((a, b) => (a.taskId > b.taskId) ? 1 : -1));
 }
 else if(req.params.dir === 'desc'){
   res.json(tasks.sort((a, b) => (a.taskId < b.taskId) ? 1 : -1));
 }
})
Querying Tasks
As things stand, our API only lets one authenticated user access the application. Once that user is authenticated they will only be able to see tasks either they created or that they were assigned. This means that we need to create a route that can queries tasks assigned to that user, such as 
GET /api/tasks/user/:user
Where :user is the user name assigned to a user’s tasks. Here is the route and handler function to perform the query. The function uses Javascript’s filter method to return a list that matches the parameter.
router.get('/user/:user', (req, res) =>{
 res.json(tasks.filter(task => task.user === req.params.user));
})

Next, let’s add a route that enables us to return a single task. In theory, we could create a copy of the previous route and make minor alterations. So, to implement:
GET /api/tasks/task/:taskId
All we need to do is this:
router.get('/task/:taskId, (req, res) =>{
 res.json(tasks.filter(task => task.taskId === req.params.taskId));
})
Even though this code returns a single task, it returns it within an area. There are a number of ways to extract an object from an array. If we replace the filter method with the find method, we don’t have to bother. This is because the find method only returns a single object.
router.get('/task/:taskId', (req, res) =>{
 res.json(tasks.find(task => task.taskId === req.params.taskId));
})
In theory, our code should work, unfortunately it doesn’t. While it doesn’t fail, it doesn’t return any data. This is because by default the route’s taskId parameter is a string  and the taskId is an integer. To ensure that the route’s handler function can match the parameter to the taskId, we use Javascript’s parseInt command to convert it into an integer.
router.get('/task/:taskId', (req, res) =>{
 res.json(tasks.find(task => task.taskId === parseInt(req.params.taskId)));
})

Managing Tasks
We will now add three routes for managing tasks. 
Adding Tasks
Let’s start by enabling a user to add a task. We will implement this route using an HTTP post command to 
POST /api/tasks/add 
That sends the following payload:
{
 "description": "My task",
 "name": "task",
 "user": "jonnygold",
 "added": "2024-05-01T22:00:00.000Z",
 "updated": "2024-05-01T14:16:01.119Z",
 "status": "done",
 "isActive": true,
 "isEdit": false
}
We can implement the route using the router.post middleware. The route’s handler function receives the payload and appends it to the tasks list. The function returns an object that returns an object that includes the payload and appends a status message. The three dots before req.body are called a spread operator. This enables you to create a new object from an existing one and add additional attributes.
router.post('/add', (req, res) =>{
 tasks.push(req.body);
 res.json({
   ...req.body,
   message: 'Task added successfully'});
})



Updating Tasks
Like the queries discussed earlier, we could create the update route by copying the add route and making the necessary adjustments. While we could implement the update route using the HTTP POST command, let’s instead use HTTP PUT command to PUT /api/tasks/update:/taskID. Like the add route, update also sends a payload that includes the changes they want to make to the task. HTTP PUT is frequently used for updating existing data, and helps API users identify the route's intended purpose.


router.put('/update/:taskId', (req, res) =>{
 tasks = tasks.map(task => {
   if(task.taskId === parseInt(req.params.taskId)){
     task = req.body;
   }
 });
 res.json({
   ...req.body,
   message: 'Task updated successfully'});
})



In order to update the task, the handler function must loop through all the tasks until it finds the correct target. To locate and update the task, the code loops through all the tasks using Javascript’s .map method and replaces task data with the payload. It also returns the payload with a status message.
Deleting Tasks
Since the delete task route can be implemented within a route’s path, we could use HTTP GET to create it, but we will use HTTP DELETE. This is for the same reason why we previously.
To delete a task, the user sends a HTTP Delete command to DELETE /api/tasks/:taskId.


router.delete('/delete/:taskId', (req, res) =>{
 tasks = tasks.filter(task => task.taskId !== parseInt(req.params.taskId))
 res.json(tasks);
})

The code removes the tasks using Javascript’s .filter method and returns the updated tasks list.
Conclusion and Next Steps
In this installment, we created a task API and explored how to create routes with default and optional parameters. In addition, we implemented task management functionality using HTTP POST, PUT, and DELETE commands. In the next installment, we take things a step further and look at how we can use a database to persist and modify data.
