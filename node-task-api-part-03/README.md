# **Node JS Express for FrontEnd Developers Part Three: Understanding Routing**

In [Part Two](https://www.linkedin.com/pulse/node-js-express-frontend-developers-part-two-building-jonathan-gold-tji3f/?trackingId=GikAU8DkTDWCPPvxtCdQxQ%3D%3D), we had created endpoints to query and authenticate users. Using the Express Framework, you create endpoints by defining routes. In this installment, we dive deeper into routes and routing. We will also look at how we can take advantage of routing to modularize our web applications to make them easier to maintain and extend.As with previous installments, the sample code and files for this installment can be downloaded from [GitHub](https://github.com/trider/node-task-api-tutorial/tree/main/node-task-api-part-02). 

## **What is Routing**

The Express Framework uses routing to manage and direct requests. Each route represents a path (URL) that sends a request to a handler function. The handler is a callback or middleware code that processes the request and returns a response. These are the main routes and handler functions in our application. They run at the application (app) or global level and are located in a single file. 

``` javascript
app.get('/api/users', (req, res) => {  
 res.json(users);  
});

app.get('/api/users/:user', (req, res) => {  
 res.json(users.find(user => user.userName === req.params.user));   
});

app.post('/api/users/login', (req, res) => {  
 if(users.find(user => user.email === req.body.email && user.password === req.body.password)){  
  res.json({ ...users.find(user =>   
   user.email === req.body.email && user.password === req.body.password),   
   message: 'Login successful', isAuthenticated: true});  
 }  
 else{  
   res.json({message: 'Login failed', isAuthenticated: false});  
 }  
});
```

All these routes provide user related functionality. As we are building a task management API, our next step should be to add task related functionality.  The problem is that as we add more functionality and capabilities the number of endpoints will increase in size and complexity. Over time the more code we add, the harder our application becomes to manage and maintain. Before that happens, let’s look at how to structure and organize our code to avoid longer-term management and maintenance issues.

## **Modularizing our Application**

Before we add any new functionality, we will modularize our application into smaller units organized around functionality. Let's start by adding a folder called api to our project. This folder will contain code and related data files. Move the existing data folder into the API folder. Create a subfolder called modules. Now we have reorganized our application code we can use the Express Framework’s Router middleware to move related routes into specific files. In the API folder, create a file called api.js. This file defines the top level route. From now on, all route URLs will start with /api/ followed by the route type /api/user.

![top](top.png)

Open api.js and declare a variable that references Express. Then declare a variable that instantiates the Express router middleware

``` javascript
const express = require('express'); 
const router = express.Router();
```

Next, we create the /api/users route that includes a reference to the users.js module.  

``` javascript
router.use('/users', require('./modules/users'));
```

The final step is to add a line that exports the code and makes it available to index.js.

``` javascript
module.exports = router;
```

## **Creating Modules and Routes**

Once we have our top level route in place, we can create our first module. In the api/modules folder, create user.js. Add the following code to the file.

``` javascript
const express = require('express');
const router = express.Router();
const users = require('../data/users');

module.exports = router;
```

In the middle of the file, add the User API routes. The new user routes are almost identical to our original routes in index.js, with two key differences. The first difference is that they are defined using the router and not the application middleware. The second is that they are much shorter than routes defined at the application level.

``` javascript

router.get('/', (req, res) => {  
 res.json(users);  
});

router.get('/:user', (req, res) => {  
 res.json(users.find(user => user.userName === req.params.user));   
});

router.post('/login', (req, res) => {  
 if(users.find(user => user.email === req.body.email &&   
    user.password ===req.body.password)){res.json({  
       ...users.find(user => user.email === req.body.email &&   
       user.password === req.body.password),  
       message: 'Login successful',  
       isAuthenticated: true  
     }  
   );  
 }  
 else{  
   res.json({message: 'Login failed', isAuthenticated: false});  
 }  
});
```

## **Code Cleaning Up**

Now we can clean up index.js. In index.js, remove the /api/users, /api/users/:user, and /api/users/login routes. Update the redirect to point to /api. Then, add a reference to /api.

``` javascript
app.get('/', (req, res) => {  
 res.redirect('/api');  
});

app.use('/api', api);
```

The only thing left to do is add a redirect to api/api.js that opens the default route (the list of users), when we launch the API.

``` javascript
app.get('/', (req, res) => {  
 res.redirect('/api/users');  
});
```

## **Conclusion and Next Steps**

In this installment, we reorganized our code and created a modular API. This will make it easier to manage and extend our task management API. By using the Express Framework’s router middleware, we built highly modular code. As a result, we were able to create simple and compact paths instead of creating long URLs for each endpoint. In part four, we will create the Tasks API using more advanced routing functionality.
