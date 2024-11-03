const express = require('express');
const router = express.Router();
const mongoAPI = require('./mongo');

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *     type: object
 *     properties:
 *      _id:  
 *       type: string
 *       description: Unique ID of task.
 *       example: 6630ab326e723ac1ea6dce7a
 *      description:
 *        type: string
 *        description: The task description.
 *        example: Task description
 *      name:
 *        type: string
 *        description: The task name.
 *        example: Task name
 *      taskId:
 *        type: integer
 *        description: The task ID.
 *        example: 1
 *      user:
 *        type: string
 *        description: The user name.
 *        example: joegreen
 *      added:
 *        type: string
 *        description: The date the task was added.  
 *        example: 2021-09-23T00:00:00.000Z
 *      updated:
 *        type: string
 *        description: The date the task was last updated. 
 *        example: 2021-09-23T00:00:00.000Z
 *      status:
 *        type: string
 *        description: The task status.
 *        example: do
 *      isActive:
 *        type: boolean
 *        description: The task is in use.
 *        example: true
 * 
 * 
*/

/**
 *
 * @swagger
 *  /api/tasks/user/{user}:
 *    get:
 *     summary: Retrieve a list of tasks for a user.
 *     description: Retrieve a list of tasks for a user from the database.
 *     tags:
 *     - Tasks
 *     parameters:
 *     - in: path
 *       name: user
 *       required: true
 *       description: The user name
 *       schema:
 *        type: string
 *     responses:
 *      200:
 *       description: A list of tasks for the user.
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           type: object  
 *           $ref: '#/components/schemas/Task'
 */ 

router.get('/user/:user',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItems(
        { db: 'tasksDB', collection: 'tasks', query: { user: req.params.user, isActive:true } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

/**
 * @swagger
 * /api/tasks/task/{id}:
 *   get:
 *     summary: Returns a single task.
 *     description: Retrieve a single task by task ID.
 *     tags:
 *     - Tasks
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Task ID.
 *       schema:
 *         type: integer
 *     responses:
 *       200:
 *         description: A task.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 */
router.get('/task/:taskId',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItem(
        { db: 'tasksDB', collection: 'tasks', query: { taskId:parseInt(req.params.taskId)} }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

/**
* @swagger
* /api/tasks/add:
*   post:
*     summary: Create a new task.
*     description: Create a new task in the database.
*     tags:
*     - Tasks
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*            type: object
*            properties:
*              name:
*                type: string
*                description: The task name.
*                example: A New Task
*              description:
*                type: string
*                description: The task description.
*                example: A new task description
*              user:
*                type: string
*                description: The user name.
*                example: jonnygold
*     responses:
*       200:
*         description: A new task.
*         schema:
*           $ref: '#/components/schemas/Task'
*/

router.post('/add', (req, res) => {
   let tasks = null
      let taskId = null
      const getData = new Promise((resolve) => {
        mongoAPI.getItems(
          { db: 'tasksDB', collection: 'tasks', query: {} }
        ).then((data, err) => resolve(data))

      }).then((data) => {
        tasks = data
        taskId = tasks.length + 1
        return mongoAPI.writeItem({
          db: 'tasksDB',
          collection: 'tasks',
          data: {
            ...req.body,
            taskId: taskId,
            added: new Date(),
            updated: new Date(),
            isActive: true

          }
        })
      }).then((data) => {
        return mongoAPI.getItem(
          { db: 'tasksDB', collection: 'tasks', query: { "taskId": taskId } }
        )
      }).then((data) => {
          return res.json(data)
      })
      return getData.then(data => data).catch((err) => {
        console.log(err)
      })


  
});

/**
 * @swagger
 * /api/tasks/update:
 *   post:
 *    summary: Update a task.
 *    tags:
 *    - Tasks
 *    description: Update a task in the database.
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object  
 *        properties: 
 *          name:
 *           type: string
 *           description: The task name.
 *           example: A New Task  
 *          description:
 *           type: string
 *           description: The task description.
 *           example: A new task description
 *          user:
 *           type: string
 *           description: The user name.  
 *           example: jonnygold
 *          taskId:
 *            type: integer
 *            description: The task ID.
 *            example: 1
 *          status:
 *            type: string  
 *            description: The task status.
 *            example: do
 *    responses:
 *        200:
 *          description: A task.
 *          schema:
 *            $ref: '#/components/schemas/Task' 
 */
router.post('/update/:taskId', (req, res) => {
   const getData = new Promise((resolve) => {
      mongoAPI.updateItem(
        { db: 'tasksDB', collection: 'tasks', query: { taskId: parseInt(req.params.taskId)  }, data: req.body }
      ).then((data, err) => resolve(data))
    }).then((data) => {

      return mongoAPI.getItem(
        { db: 'tasksDB', collection: 'tasks', query: { taskId: parseInt(req.params.taskId) } }
      )
    }).then((data) => {

      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

/**
 * @swagger
 * /api/tasks/delete:
 *  post:
 *   summary: Delete a task.
 *   description: Delete a task in the database.
 *   tags:
 *    - Tasks
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *           type: object
 *           properties:
 *              taskId:
 *                type: integer
 *                description: The task ID.
 *                example: 1
 *   responses:
 *    200:
 *     description: A task.
 *     schema:
 *      $ref: '#/components/schemas/Task'
*/
router.post('/delete', (req, res) => {
  const getData = new Promise((resolve) => {
    mongoAPI.updateItem(
      {
        db: 'tasksDB',
        collection: 'tasks',
        query: { "taskId": req.body.taskId },
        data: {
          isActive: false,
          updated: new Date()
        }
      }
    ).then((data, err) => resolve(data))
  }).then((data) => {
    return mongoAPI.getItem(
      { db: 'tasksDB', collection: 'tasks', query: { "taskId": parseInt(req.body.taskId)} }
    )
  }).then((data) => {

    return res.json(data)
  })
  return getData.then(data => data).catch((err) => {
    console.log(err)
  })
});

module.exports = router;