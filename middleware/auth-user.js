//This module will hold the middleware to authenticate the request using Basic Authentication.

//Defining and exporting a middleware function
'use strict';
//importing basic-auth module
const auth = require('basic-auth');
// Middleware to authenticate the request & exporting it so we can import it from within another module.
exports.authenticateUser = async (req, res, next) => {
  //   // Parse the user's credentials from the Authorization header.

  // If the user's credentials are available...
     // Attempt to retrieve the user from the data store
     // by their username (i.e. the user's "key"
     // from the Authorization header).

  // If a user was successfully retrieved from the data store...
     // Use the bcrypt npm package to compare the user's password
     // (from the Authorization header) to the user's password
     // that was retrieved from the data store.

  // If the passwords match...
     // Store the retrieved user object on the request object
     // so any middleware functions that follow this middleware function
     // will have access to the user's information.

  // If user authentication failed...
     // Return a response with a 401 Unauthorized HTTP status code.

  // Or if user authentication succeeded...
     // Call the next() method.

  next();
};
//the next() function passes execution to the next middleware

