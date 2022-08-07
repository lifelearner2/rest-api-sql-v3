//this file defines the application's routes

//USER ROUTES:
//array created to hold user records once created
const users = [];

// Adding routes
app.use('/api', routes);

//Get Users Route | route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/api/users', (req, res) => {
    res.json(users);
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

// Add the user to the `users` array.
users.push(user);

// Set the status to 201 Created and end the response.
//return res.status(201).end();  //this is giving an error - says it needs to be in a function

//COURSES ROUTES:
//Get Users Route | route that will return all courses for the currently authenticated User along with a 200 HTTP status code.
router.get('/api/users', (req, res) => {
    res.json(users);
  });

//Get Users Route | route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/api/users', (req, res) => {
    res.json(users);
  });
//
  router.get('/api/courses/:id', (req, res) => {
      res.json(courses);
  })
;


