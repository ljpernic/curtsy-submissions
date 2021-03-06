/////////////////////////////THE PRIMARY FILE, WHAT ACTUALLY GETS RUN. EVERYTHING HAS TO CONNECT HERE!/////////////////////////////

//// left-indented things have been added in the products-api project too
//// right-indented things are from the task-manager project

const express = require('express');                                         // Makes express available
const app = express();                                                      // Initializes express and its HTTP modules for this app

const submissions = require('./routes/submissions');                        // Makes controllers from controllers/submissions.js paired with routes in app.js available
const readers = require('./routes/readers')                                 // Makes readers from readers/submissions.js paired with routes in app.js available
const connectDB = require('./db/connect');                                  // Makes the database URL defined in .env and passed through db/connect.js available

const port = process.env.PORT || 5000;                                      // Sets the port listed in ENV or 5000

require('dotenv').config();                                                 // Makes dotenv package available to hide the .env file, where database link is

require('express-async-errors')                                             // Automates asynchronous error handling in async functions.
                                                                            //// Would replace the asyncWrapper used throughout
const notFound = require('./middleware/not-found');                         // Makes 404 page-not-found error available
const errorHandlerMiddleware = require('./middleware/error-handler');       // Makes 500 server error available

// middleware

app.use(express.static('./public'));                                            // Makes everything in the public folder available
app.use(express.json());                                                    // This gives us access to the json data in the havascript HTTP request
                                                                            //// Without it, we don't have access to data through req.body 

// routes

app.use('/api/v1/submissions', submissions);                                    // Where the req.body shows itself; second thing is the routes file required above
app.use('/api/v1/readers', readers);                                            // Where the req.body shows itself; second thing is the routes file required above

app.use(notFound);                                                          // Applies the 404 page-not-found error whenever applicable
app.use(errorHandlerMiddleware);                                            // Applies the 500 server error whenever applicable

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL);                              // Tries to connect to the database with a promise, based on the link in .env
    app.listen(port, () =>                                                  // If it succeeds, it logs a message on the console
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {                                                         // If it doesn't, it logs an error
    console.log(error);
  }
};

start();                                                                    // If it succeeds, it starts the server