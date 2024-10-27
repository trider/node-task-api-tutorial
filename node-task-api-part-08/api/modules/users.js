const express = require('express');
const router = express.Router();
const mongoAPI = require('./mongo');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      properties:
 *       _id:
 *        type: string
 *        description: Unique ID of task.
 *        example: 6630ab326e723ac1ea6dce7a
 *       email:
 *        type: string
 *        description: The user's email address.
 *        example: jg@mail.com
 *       name:
 *        type: string
 *        description: User's first and last names.
 *        example: Joe Green
 *       password:
 *        type: string
 *        description: User's password.
 *        example: password
 *       userName:
 *        type: string
 *        description: The user's name.
 *        example: joegreen
 *       userId:
 *        type: integer
 *        description: The user ID.
 *        example: 1
 *       isActive:
 *        type: boolean
 *        description: The user's status.
 *        example: true
 *       created:
 *        type: string
 *        description: The date the user was created.   
 *        example: 2021-09-23T00:00:00.000Z
 *       updated:
 *        type: string
 *        description: The date the user was last updated.
 *        example: 2021-09-23T00:00:00.000Z
 *      -ref: '#/components/schemas/User' 
 *        
 *         
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users from the database.
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/User'
 */

router.get('/', (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItems({ db: 'tasksDB', collection: 'users', query: {  } }
    ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)
    })
    return getData.then(data => data).catch((err) => console.log(err))
});

/**
 * **
 * @swagger
 * /api/users/{user}:
 *   get:
 *     summary: Returns a single user.
 *     description: Retrieve a single user by username.
 *     tags:
 *     - Users
 *     parameters:
 *     - in: path
 *       name: user
 *       required: true
 *       description: User name.
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: A user profile.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */

router.get('/:user', (req, res)=> {
   const getData = new Promise((resolve) => {
      mongoAPI.getItem(
        { db: 'tasksDB', collection: 'users', query: { "userName": req.params.user } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

/**
 * **
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user.
 *     tags:
 *      - Authentication
 *     description: Login a user by username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: jonnygold@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 1234
 *     responses:
 *       200:
 *         description: A user profile.
 *         schema:
 *           $ref: '#/components/schemas/User'  
 *  
 */
router.post('/login', (req, res) =>{
  const getData = new Promise((resolve) => {
    console.log(req.body)
    mongoAPI.getItem(
      { db: 'tasksDB', collection: 'users', query: req.body }
    ).then((data, err) => resolve(data))
  }).then((data) => {
    if(data !== null) {
      data = {
        ...data,
        status: "User found",
        isAuthenticated: true
      }

    }
    else{
      data = {
        status: "User not found",
        isAuthenticated: false
      }
    }
    return res.json(data) 

  })
  return getData.then(data => data).catch((err) => console.log(err))
});


module.exports = router;