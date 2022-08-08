'use strict';
//This file is the entry point to the app and the Sequelize models are used to create and retrieve data from the database.
//This file also creates and configures the Express application

//const models = ''

//importing objects from models folder to be initialize them
const { sequelize, models } = require('./models');
//should I be requiring the fsjstd-restapi.db folder instead? I don't have a ./db like the video

// Get references to our models. Declaring and initializing variables to the models.
//const { User, Course } = models; //giving errors that models is not defined

// load modules
const express = require('express');
const morgan = require('morgan');

//Testing database connection (I looked this up online and then figured out that I needed to wrap it in a asyncHandler)
//However, the  video does it slightly different - is mine still okay?
function asyncHandler(cb){
  return async (req, res, next)=>{
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
 // Sync the models
 console.log('Synchronizing the models with the database...');
 await sequelize.sync({ force: true });

} catch (error) {
  console.error('Unable to connect to the database:', error);
}
  }
}
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Adding routes - routes defined in this router will only be considered if the route starts with /api path
//app.use('/api', routes); //getting error that routes is not defined

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
