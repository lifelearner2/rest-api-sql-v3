//this file defines the application's routes
'use strict'

const express = require('express');
const bcrypt = require('bcrypt');
const { Course, User } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');
const { UnknownConstraintError } = require('sequelize/types');

//USER ROUTES:
//array created to hold user records once created
const users = [];

//Handler function to wrap each route
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

// Adding routes - routes defined in this router will only be considered if the route starts with /api path
//app.use('/api', routes);
router.use('/api', routes);

//Get Users Route | route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
// should it be /api/users or just /users?
router.get('/api/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    let users = await User.findAll();

    res.json({
        name: user.name,
        username: user.username
      });
    //res.json(users);
    res.status(200).end();
  }));


 //POST /api/users route creates a new user account
  //set the Location header to "/", and return a 201 HTTP status code and no content.
  //not sure why the example doesn't have /api path on this one...
  router.post('/users', asyncHandler(async(req, res) => {
    // Get the user from the request body.
    const user = req.body;
    const errors = [];
    try {
        await user.create(req.body);
        res.status(201).json({ "message": "Account successfully created!"})
    } catch (error) {
        console.log('ERROR: ', error.name);
        // |below ensures that info submitted will be "unique" and not already submitted to database|
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
//ADD VALIDATIONS FOR POST ROUTE
//INCLUDE: firstName, lastName, emailAddress, password
    if (!user.firstName) {
    errors.push('Please provide a value for "first name" ');
    }
    if (!user.lastName) {
        errors.push('Please provide a value for " last name"');
      }
      if (!user.emailAddress) {
        errors.push('Please provide a value for "email"');
      }
    // Validate that we have a `password` value.
    let password = user.password;
      if (!password) {
        errors.push('Please provide a value for "password"');
      }  else if (password.length < 8 || password.length > 20) {
        errors.push('Your password should be between 8 and 20 characters');
      } else {
        user.password = bcrypt.hashSync(user.password, 10);
      }

      if (errors.length > 0) {
        // Return the validation errors to the client.
        res.status(400).json({ errors });
      } else {
    // The `user.name` property isn't defined or is set to `undefined`, `null`, or an empty string
      users.push(user);
    // Set the status to 201 Created and end the response.
    res.status(201).end();
    }
  }));

//COURSES ROUTES:
//array created to hold courses once created
const courses = [];
//Get courses Route | route that will return all courses including User associated w/each course - along with a 200 HTTP status code.
router.get('/api/courses', asyncHandler(async(req, res) => {
    const allCourses = await course.findAll({
        include: [
            {
                model: user,
            },
        ],
    })()
    res.json(allCourses);
    res.status(200).end();
  }));

//Get route that returns corresponding course incl. User assoc w/course & 200 code
  router.get('/api/courses/:id', (req, res) => {
      res.json(user, courses);
 // Set the status to 200 Created and end the response.
    res.status(200).end();
});

//Post route that creates new course, sets location header to URI for new course & returns a 201 code
router.post('/api/courses/:id',  authenticateCourse), (req, res) => {
    res.json(location, courses);
    const course = req.body;
    try {
        await course.create({})
    } catch(err) {
        if('') {

        } else {

        }

    }
//ADD VALIDATION FOR NEW COURSE POST ROUTE
//INCLUDE: title, description
    if (!user.title) {
    errors.push('Please provide a value for "title" ');
    }
    if (!user.description) {
        errors.push('Please provide a value for "description" ');
        }

    courses.push(course);
    return res.status(201).end();
}

//Put route that updates corresponding course and returns a 204 code
router.put('/api/courses/:id', authenticateCourse, asyncHandler(async(req, res, next) => {
    try {
      const course = await Course.findByPk(req.params.id);
      course ? res.render(courses, { course }) : next();
      res.status(204).end();
    } catch(err) {
      //throw err;
    }

 //ADD VALIDATION FOR PUT ROUTE
  //INCLUDE: title, description
  if (!course.title) {
    errors.push('Please provide a value for "title" ');
    }
  
  if (!course.description) {
    errors.push('Please provide a value for "description" ');
    }

  //error code for 400 if validation fails
  if (errors.length > 0) {
    // Return the validation errors to the client.
    res.status(400).json({ errors });
  }  else {
    // Add the course to the `courses` array.
    courses.push(course);
  };

//Delete route will delete corresponding course and return a 204 code
router.delete('/api/courses:id/delete', authenticateUser, asyncHandler(async(req, res) => {
    try {
      await Course.destroy({ where: { id: req.params.id } });
        res.json(courses);
    } catch(err) {
      //throw err;
      res.status(204).end();
    }
}
  ));
}));
  module.exports = router;