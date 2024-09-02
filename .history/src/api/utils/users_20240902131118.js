const express = require('express');
const router = express.Router();
const mongoAPI = require('./mongo');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('.,/swagger');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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
router.get('/',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItemsData({ db: 'tasksDB', collection: 'users', query: {  } }
    ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.get('/:user',  (req, res) =>{
   const getData = new Promise((resolve) => {
      mongoAPI.getItemData(
        { db: 'tasksDB', collection: 'users', query: { "userName": req.params.user } }
      ).then((data, err) => resolve(data))
    }).then((data) => {
      return res.json(data)

    })
    return getData.then(data => data).catch((err) => console.log(err))
});

router.post('/login',  (req, res) =>{
  const getData = new Promise((resolve) => {
    console.log(req.body)
    mongoAPI.getItemData(
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
    // console.log(data)
    return res.json(data) 

  })
  return getData.then(data => data).catch((err) => console.log(err))
});



//export this router to use in our index.js
module.exports = router;