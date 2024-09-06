# **Node JS Express for FrontEnd Developers Part One: Getting Starting**

Node.js uses Chrome’s V8 Javascript engine to provide a cross-platform development platform. In other words, it takes Javascript out of the browser and lets you run it anywhere. This makes it especially attractive for web developers because Node lets you use a single language and development tools for backend and frontend applications. 

In this series, we will use Node with the Express framework to provide a backend for [React](https://github.com/trider/react-task-tutorial) and [Angular](https://github.com/trider/ng-task-tutorial) task management web applications. We will also cover querying and persisting data with [MongoDB](https://www.mongodb.com/), using [Swagger](https://yyu3nikvu1.execute-api.us-east-1.amazonaws.com/api-docs/) to provide online documentation, and deploying a [serverless](https://app.serverless.com/) version of the application.

In this first part, we will install our development environment, create an index.js file, and write the initial application code. Please note that Node.js supports both regular Javascript and TypeScript. For the sake of simplicity, I have written the examples using Javascript. In addition, all examples are written using arrow notation, in line with current conventions, instead of function calls.

## **Getting Started**

Before we can build a Node application, we need to install Node.js. How you install Node, depends on your development platform and your preferred package manager. The good news is that the [Download](https://nodejs.org/en/download/package-manager) page on the Node website covers all the available ways to download and install Node. Once you have Node installed, open a Terminal window and create a new folder.

```bash
mkdir node-task-app
```

Next, open the folder

```bash
cd node-task-app  
```

Now, we create the app using this command

```bash
npm init
```

Follow the commands, and at the end type: Yes.

```bash
Use \`npm install \<pkg\>\` afterwards to install a package and  
save it as a dependency in the package.json file.  
Press ^C at any time to quit.  
package name: (task-app) node-task-app  
version: (1.0.0)   
description: Node task app  
entry point: (index.js)   
test command:   
git repository:   
keywords:   
author:   
license: (ISC)   
About to write to /Users/jonathangold/Code/MVDS/node/node-task-app/package.json:  
{  
  "name": "node-task-app",  
  "version": "1.0.0",  
  "description": "Node task app",  
  "main": "index.js",  
  "scripts": {  
    "test": "echo \\"Error: no test specified\\" && exit 1"  
  },  
  "author": "",  
  "license": "ISC"  
}  
Is this OK? (yes) yes
```

Next, open your application folder in your IDE/editor, such as Visual Studio Code. In the IDE, open the terminal and type:

```bash
npm install
```

As a final step, we install the Express framework.

```bash
npm install express
```

## **Creating an Entrypoint**

With the basic pieces in place, we can create an entry point to our application. As the name suggests, this page serves as the gateway to our server application. To create the entry point, create a file called index.js.

![][image1]

In your editor, open index.js. Add a reference to the Express framework:

```javascript
const express = require('express');
```

Now, we create our web application by declaring the app variable and instantiating the Express framework.

```javascript
const app = express();
```

At the bottom of the file, we add a listener. This listens for requests on the specified port. In our example, we specified port 3000\. In the function, we add a line that logs a message when the app is run.

```javascript
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
```

Launch the app by opening the application folder in the terminal and typing.

```bass
node index.js
```

The terminal displays the text in the message.

## **Adding a Route**

So far, our app doesn’t do very much. If we type the address [http://localhost:3000](http://localhost:3000), the browser displays a blank page. To display a message, we need to create a route. In front-end development, routes provide the address of a specific page. Each route is a URL that navigates directly to that page. In our case, we are building a REST API. So, each route will either return data or perform an action. To demonstrate, let's add a route that displays a message when we open  [http://localhost:3000](http://localhost:3000). In the middle of the app, add:

```javascript
app.get('/', (req, res) => {
 res.send('Welcome to the Task API');
});
```

Here we define the default route. This route receives an HTTP Get command, and returns a short message.  The command has two parameters req and res. The req parameter is an object used to pass parameters, and we will look at it in more details in the next installment. The res parameter is an object used to return a response. In our case, we use the res.send method to return a short string. If you restart the app and refresh your browser, you will see a message.

## **Conclusion and Next Installment**

In this part, we tool our first steps build a REST API with Node.js and Express. We installed Node and configured our development environment. Next, we created an index.js file and created the foundations of our API. The last step was to create a route that displays a message when calling the API. In the next installment, we will build on this foundation and dive deeper into routing.

[image1]: <data:image/png;base64,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>