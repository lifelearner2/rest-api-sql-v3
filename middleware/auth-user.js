//This module will hold the middleware to authenticate the request using Basic Authentication.

//Defining and exporting a middleware function
'use strict';
//importing basic-auth module & User model
const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { User } = require('../models');
// Middleware to authenticate the request & exporting it so we can import it from within another module.
exports.authenticateUser = async (req, res, next) => {
    let message; // declaring message variable/store the message to display
// Parse the user's credentials from the Authorization header to see if user's key is association with any others in database
  const credentials = auth(req);
  if (credentials) {
       // Attempt to retrieve the user from the data store
    const user = await User.findOne({ where: {username: credentials.name} });
    if (user) {
        const authenticated = bcrypt
        // Use the bcrypt npm package to compare the user's password
        .compareSync(credentials.pass, user.confirmedPassword);
        // If the passwords match...compareSync() returns true, or false if they don't
        //if authentication is successful, add user account to request object and continue processing request.
        if (authenticated) { 
            console.log(`Authentication successful for username: ${user.username}`);
            // Store the user on the Request object. - adding currentUser to req obj & setting it to authenticated user.
            req.currentUser = user;
        }  else {
            message = `Authentication failure for username: ${user.username}`;
            }
        }  else {
            message = 'Auth header not found';
        }
        // If user authentication failed...Return a response with a 401 Unauthorized HTTP status code & generic "Access Denied" message..
        if (message) {
            console.warn(message);
            res.status(401).json({ message: 'Access Denied' });
       // Or if user authentication succeeded...Call the next() method.
          } else {
      //the next() function passes execution to the next middleware
        next();
          }
        }
    };

module.exports = auth-user;




