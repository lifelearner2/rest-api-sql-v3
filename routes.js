//this file defines the application's routes

//USER ROUTES:
//array created to hold user records once created
const users = [];

// Adding routes
app.use('/api', routes);

//Get Users Route | route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/api/users', (req, res) => {
    res.json(users);
    res.status(200).end();
  });

  //created a route for creating new users  
  //set the Location header to "/", and return a 201 HTTP status code and no content.
  router.post('/api/users', (req, res) => {
    // Get the user from the request body.
    const user = req.body;
  
    //POST /api/users route creates a new user account
    // Add the user to the `users` array.
    users.push(user);
  
    // Set the status to 201 Created and end the response.
    res.status(201).end();
  });

  // Get the user from the request body.
const user = req.body;

//COURSES ROUTES:

//Get courses Route | route that will return all courses including User associated w/each course - along with a 200 HTTP status code.
router.get('/api/courses', (req, res) => {
    res.json(user, courses);
    res.status(200).end();
  });

//Get route that returns corresponding course incl. User assoc w/course & 200 code
  router.get('/api/courses/:id', (req, res) => {
      res.json(user, courses);
 // Set the status to 200 Created and end the response.
    res.status(200).end();
});

//Post route that creates new course, sets location header to URI for new course & returns a 201 code
router.post('/api/courses/:id'), (req, res) => {
    res.json(location, courses);
    courses.push(course);
    res.status(201).end();
}

//Put route that updates corresponding course and returns a 204 code
router.put('/api/courses/:id'), (req, res) => {
    res.json(courses);
    res.status(204).end();
}


//Delete route will delete corresponding course and return a 204 code
router.delete('/api/courses/:id'), (req, res) => {
    res.json(courses);
    res.status(204).end();
}