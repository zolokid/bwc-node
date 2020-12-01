// Required Imports
const express   = require('express');
const apiRouter = express.Router(mergeParams=true);

// All the child routers defined
const registerRouter = require('./register.js');


apiRouter.get('/', (req, res) => {
    res.send({
      message: 'Hello from the API',
    });
  });

apiRouter.use('/register', registerRouter);

module.exports = apiRouter;