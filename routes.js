'use strict';

const express = require('express');
const { asyncHandler } = require('./middleware/async-handler');
const { User, Course } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();


//USER ROUTES:

//GET /api/users Route | route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  // currentUser is returned from authenticateUser middleware.
  const user = await req.currentUser;
  res.json({user});
}));

//POST /api/users route creates a new user account
//set the Location header to "/", and return a 201 HTTP status code and no content.
router.post('/users', asyncHandler(async (req, res) => {
  await User.create(req.body);
  res.status(201).location("/").end();
}));


//COURSES ROUTES:

//GET courses Route | route that will return all courses including User associated w/each course - along with a 200 HTTP status code.
router.get('/courses', asyncHandler(async (req, res) => {
  let courses = await Course.findAll({
    include: {model: User}
  });
  res.json(courses);
}));

//GET route that returns corresponding course incl. User assoc w/course & 200 code
router.get("/courses/:id", asyncHandler(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id, {
    include: {model: User}
  }); 
  course ? res.json(course) : next();
}));

//POST route that creates new course, sets location header to URI for new course & returns a 201 code
router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {
  const course = await Course.create(req.body);
  res.status(201).location(`/courses/${course.id}`).end();
}));

//PUT route that updates corresponding course if the user owns it and returns a 204 code
router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  const user = await req.currentUser;
  if (course.userId === user.id) {
    await course.update(req.body);
    res.status(204).end();
  } else {
   next();
  }
}));

//DELETE route that deletes corresponding course if the user owns it and returns a 204 code
router.delete('/courses/:id', authenticateUser, asyncHandler(async(req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  const user = await req.currentUser;
  if (course.userId === user.id) {
    await course.destroy();
    res.status(204).end();
  } else {
    next();
  }
}));


module.exports = router;