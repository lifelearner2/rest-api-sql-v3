// load modules
const express = require('express');
const Sequelize = require('./models/index.js').sequelize;
const routes = require('./routes.js');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
app.use(express.json());

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// sets up all routes to start with /api
app.use('/api', routes);

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

// Sequelize model synchronization, then start listening on our port.
(async () => {
  try {
    await Sequelize.sync();
    await Sequelize.authenticate();
    console.log('Connection to the database successful!');
    const server = await app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  } 
})();