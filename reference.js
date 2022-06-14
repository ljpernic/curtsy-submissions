/////////////////////////////THIS FILE IS FOR REFERENCE/////////////////////////////


//const passedNumbers = require('./numbers')                                  // A simple way to make data available from the numbers.js file
//const calc = require('./modules')                                           // A simple way to make functions available from the module.js file

//const result = calc.sum(passedNumbers.numbersToAdd)                         // 'calc' is all of the modules functions, sum is function inside of it
//console.log(`The result is: ${result}`)                                     // Sum is applied to the numbersToAdd array inside passedNumbers 


/////////////////////////////BUILT-IN OS MODULE (WITHIN NODE)/////////////////////////////


//const os = require('os')                                                      
//const user = os.userInfo()                                                  // info about current user

//console.log(`The system uptime is ${os.uptime} seconds`);                   // Returns the system uptime in seconds

//const currentOS = {
//  name:os.type(),
//  release: os.release(),
//  totalMem: os.totalmem(),
//  freeMem: os.freemem(),
//}
//console.log(currentOS);


/////////////////////////////BUILT-IN PATH MODULE (WITHIN NODE)/////////////////////////////


//const path = require('path')
//console.log(path.sep);                                                                        // Shows what character separates folders/files in the system

//const filePath = path.join('contentFolderName', 'subfolderName', 'specificFile.txt')          // Gives the file path of a specific file
//console.log(filePath)

//const base = path.basename(filePath)                                                          // Gives the base file name at filePath
//console.log(base)

// __dirname refers to the direction that the index file (this file!) is in

//const absolute = path.resolve(__dirname, 'contentFolderName', 'subfolderName', 'specificFile.txt')        // Returns an absolute path!


/////////////////////////////BUILT-IN FS MODULE (WITHIN NODE) -- SYNCHRONOUS/////////////////////////////


//const {readFileSync, writeFileSync } = require('fs');

//const first = readFileSync('./content/first.txt', 'utf8')                                     //  Requires path and encoding
//const second = readFileSync('./content/second.txt', 'utf8')

//console.log(first, second);

//writeFileSync(
//  './content/result-sync.txt', 
//  `Here is the result: ${first}, ${second}`,
//  {flag: 'a'}                                                                                 // This flag makes it *not overwrite the file. It overwrites by default!)
//  )


/////////////////////////////BUILT-IN FS MODULE (WITHIN NODE) -- ASYNCHRONOUS/////////////////////////////


//const {readFile, writeFile } = require('fs');                                                 // Needs a callback to finish
//
//readFile('./content/first.txt', 'utf8', (err, result)=>{                                     // Third argument (in () is the callback and includes an error message)
//  if(err){
//    console.log(err);
//    return;
//  }
//  const first = result;
//  readFile('./content/second.txt', 'utf8', (err, result)=>{
//    if(err){
//      console.log(err);
//      return;
//    }
//    const second = result;
//    writeFile(
//      './content/result-async.txt',
//      `Here is the result : ${first}, ${second}`,
//      {flag : 'a'},
//      (err, result) => {
//        if(err){
//          console.log(err);
//          return;
//        }
//        console.log(result)
//      }
//   )
//  })
//})
//
//
/////////////////////////////BUILT-IN HTTP MODULE (WITHIN NODE)/////////////////////////////
//
//
//const http = require('http');
//
//const server = http.createServer((req, res)=>{                                                  // req = request object, res = response object
//    if(req.url === '/'){
//      res.end('Welcome to our home page')                                                       // res.end MUST be used. It shows the user your html.
//    }
//    if(req.url === '/about'){
//      res.end('This is our about page')
//    }
//    res.end(`<h1>Oops!</h1><p>You are lost.</p><a href="/">Home</a>`)
//  })
//
//server.listen(5000);
//
//
/////////////////////////////SETTING UP A PROMISE -- MAKES ASYNCHONICITY EASIER////////////////////////////////////
//
//
//const {readFile} = require('fs');
//
//const getText = (path) => {
//  return new Promise ((resolve, reject) => {
//    readFile(path, 'utf8', (err, data)=>{
//      if(err){
//        reject(err)
//      }
//      else{
//        resolve(data)
//      }
//    })
//  })
//}
//
//getText('./content/first.txt')
//  .then(result => console.log(result))
//  .catch(err => console.log(err))
//
//
/////////Can also be written like:
//
//
//const {readFile, writeFile} = require('fs');
//const util = require('util');
//const readFilePromise = util.promisify(readFile)
//const writeFilePromise = util.promisify(writeFile)
//
//const start = async() =>{
//  try {
//    const first = await readFilePromise('./content/first.txt', 'utf8')
//    const second = await readFilePromise('./content/second.txt', 'utf8')
//    await writeFilePromise('./content/result-promise-test.txt', `THIS IS AWESOME : ${first}, ${second}`)
//  } catch (error) {
//    console.log(error)
//  }}
//
//start()
//
//
/////////Can also be written like:
//
//
//const {readFile, writeFile} = require('fs').promises;                                                 // Promisify lets you make asynch patterns so that things don't interfere with each other
//
//const start = async() =>{
//  try {
//    const first = await readFile('./content/first.txt', 'utf8')
//    const second = await readFile('./content/second.txt', 'utf8')
//    await writeFile('./content/result-promise-test.txt', `THIS IS AWESOME : ${first}, ${second}`)
//  } catch (error) {
//    console.log(error)
//  }}
//
//start()
//
//
/////////////////////////////SETTING UP EVENTS////////////////////////////////////
//
//
//const EventEmitter = require('events');                   
//
//const customEmitter = new EventEmitter();                 //creates an instance from the events module
//
//customEmitter.on('response', (name, id)=>{                //on method, we pass the string (name of the event) and the callback function. Name and id = what's in .emit
//  console.log(`Data received from ${name} with id ${id}.`);
//})
//
//customEmitter.on('response', ()=>{                        //We can have as many functions as we want that are listening for that event and then do some logic
//  console.log('Please alert Javert.');
//})
//
//customEmitter.emit('response', 'Jean Valjean', 24601)     //'response' cues the emitter to the specific .on events
//
//
/////////////////////////USING EVENTS FOR SERVER REQUESTS////////////////////////////////////
//
//
//const http = require('http');
//
//const server = http.createServer();
//
//server.on('request', (req, res)=>{                //Uses the built-in 'request' event in the HTTP module to listen for a request with the .on event module
//  res.end('Welcome')          
//})
//
//server.listen(5000)
//
//
/////////////////////////////THE BASICS OF USING EXPRESS/////////////////////////////
//
//
// Represents app verbs--methods you can use to do things. Also what the user is trying to do.
//
////// app.get                           // Read data --> all browsers perform this
////// app.post                          // Insert data
////// app.put                           // Update data
////// app.delete                        // Delete data
////// app.all                           // All works with all of them; a response in you can't find a response on the server 
////// app.use                           // 
////// app.listen                        // Set the local port that we are listening on (can access with localhost)
//
//
//const express = require('express');
//const app = express();
//
//app.get('/', (req, res)=>{          // First part is the path of the resource they are trying to find. '/' is the root. Second part is the callback function.
//                                    // Callback function is invoked every time the user is performing a get request on our root
//  res.status(200).send('Home Page') // Can pass a string, can pass html. This is what the reply is to the get request 
//})                                  // The status part is where you give the 404 error (or 200, if the page actually works)
//
//app.get('/about', (req, res)=>{
//  res.status(200).send('About Page')
//})
//
//app.all('*', (req, res)=>{     // app.all covers everything that the user can do. '*' means all resources. 
//
//  res.status(404).send('<h1>Resource not found, dear friend.</h1>')
//})
//
//app.listen(5000, ()=>{
//  console.log('server is listening on port 5000');
//})
//
//
/////////////////////////////SETTING UP A NAVBNAR--THIS DEPENDS ON WHAT'S IN THE PUBLIC FOLDER!/////////////////////////////
//
//
//const express = require('express');                                             // This requires the express module that has all the http goodies (big picture)
//const path = require('path');                                                   // This says we are going to be referring to something's specific path
//
//const app = express();                                                          // This also requires the express module that has all the http goods (specific functions)
//
//                                                                                // This sets up static middleware (app.use is for this specifically)
//                                                                                // Static middleware means it's a file that server doesn't have to change
//app.use(express.static('./app/test/public'))                                         // Because we don't have to change it, we can just put it in the static /public folder.
//                                                                                // Folder app/public is where all your static resources go!
//                                                                                // On the server side, the asset can be static because it will be dynamic browser side.
////app.get('/', (req, res)=>{
////  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))            // This is the page getting sent back to the user. It will always be a root itself. 
////})                                                                            // The html page pulls things from the static public folder defined above!
////                                                                              // We don't really use this method to send html pages though! 
////                                                                              // We don't actually have to do this, though, because the index page is always a 
////                                                                              // root page itself. It contains the links to the other elements in the public folder
////                                                                              // already!  
//
//app.all('*', (req, res)=>{
//  res.status(404).send('resource not found, person reading this')
//})
//
//app.listen(5000, ()=>{
//  console.log('Server is listening on port 5000');
//})
//
//
//////////////////////////////EXPRESS, JSON, HTTP/////////////////////////////////////
//We're going to be setting up APIs that are HTTP interfaces to interact with our JSON data
//JSON organizes the data so that it is structuctured to the point that APIs can access the data and manipulate it for themselves from anywhere
//
//const express = require('express');
//const app = express();
//
//const {products} = require('./data.js')                                   // "products" is an array in the data.js file
//
//app.get('/', (req, res)=>{
//  res.json(products)                                                      // Can be any json string inside the ()
//})                                                                        // Default set-up for serving up data (the thing in res.json)
//
//
//app.listen(5000, ()=>{
//  console.log('Server is listening on 5000...');
//})
//
//
////////////////////////////MAKING INDIVIDUAL URLS FOR PRODUCTS AND SEARCHING AND LIMITING RESULTS/////////////////////////////////
//
//
//const express = require('express');
//const app = express();
//
//const {products} = require('./data.js')
//
//app.get('/', (req, res)=>{
//  res.send('<h1>Home Page</h1><a href="/api/products">products</a>')      // Can be any json string inside the ()
//})                                                                        // Default set-up for serving up data (the thing in res.json)
//
//app.get('/api/products',(req,res)=>{                                      // Establishes the /api/products resource (making stuff populate in the link)
//  const newProducts = products.map((product)=>{                           // Creates a new item called product, each of which represents one item in the products array
//    const {id, name, image} = product;                                    // Only adds id, name, and image to that new item. Leaves everything else out.
//    return {id, name, image}                                              // Returns it so that it cal be jsoned with res.json(newProducts)
//  })
//  res.json(newProducts)                                                   // Makes the new, more limited array available in JSON
//})
//
//app.get('/api/products/1',(req,res)=>{                                  // Establishes the /api/products resource (making stuff populate in the link)
//  const singleProduct = products.find((product) => product.id === 1)    // Finds product based on "id" value in the products array
//
//  res.json(singleProduct)                                               // Returns the singleProduct we found with products.find
//})
//
//app.get('/api/products/:placeholderID',(req,res)=>{                       // Establishes the /api/products resource but makes url using placeholderID (or any name)
//  console.log(req)
//  console.log(req.params);                                              // req.params is the paramater that placeholderID finds. Param is always a string though!
//  const {placeholderID} = req.params;
//  const singleProduct = products.find((product) =>                        // Finds product based on placeholderID and turns it into a number too 
//    product.id === Number(placeholderID))                                 // but will automatically create url with that placeholderID with res.json
//  if(!singleProduct){
//    return res.status(404).send('Product Does Not Exist, Ya Heard?')      // This is for products that don't exist.
//  }
//  res.json(singleProduct)                                                 // Returns the singleProduct resource based on placeholderID
//})
//
//app.get('/api/products/:placeholderID/reviews/:reviewID',(req,res)=>{     // Can use multiple placeholders. Does this set the reviewID?
//  console.log(req.params)                                                 // Reviews is hardcoded, but the :ID are not (:ID -> "route parameter")
//  res.send('Hello, World')
//})
//
//app.get('/api/v1/query', (req, res)=>{
//  console.log(req.query)
//  const { search, limit } = req.query;                                    // search and limit built into query?
//  let sortedProducts = [...products];                                     // Uses the spread operator
//  
//  if(search){
//    sortedProducts = sortedProducts.filter((sortedProduct)=>{             // Keeps only products that start with the search term
//      return sortedProduct.name.startsWith(search)                        // Returns only things that start with the giving value
//    })
//  }
//if(limit){
//  sortedProducts = sortedProducts.slice(0, Number(limit))                 // Includes # of products from 0 to definied limit (need Number to make it not a string) 
//}
//if(sortedProducts.length < 1){
//  res.status(200).send('No products found, my dude.')
//  return res.status(200).json({sucess:true, data: []})                    // Success explicitly says the url worked but there wasn't anything returned. What goes in data?
//}
//  return res.status(200).json(sortedProducts)                             // Only shows arrays that meet the user input with /app/test/v1/query?search=a&limit=2
//})
//
//app.listen(5000, ()=>{
//  console.log('Server is listening on 5000...');
//})
//
//
////////////////////////////MIDDLEWARE SETUP! LOCAL, EXPRESS, AND THIRD-PARTY MIDDLEWARE FUNCTIONS///////////////////////////////////////////////////
//
//
//////// req => middleware => res                                     // The request comes in, we'll do something with middleware, and then we'll send out the response
//
//
// const express = require('express');
// const app = express();
//
// const morgan = require('morgan')                                   // Make third-party package you've installed available for use. No path needed.
//
// const { logger } = require('./modules.js');                        // logger is a function defined in /modules.js
// const authorize = require('./authorize.js');                       // authorize is a function defined in /module.js
//                                                                    // All together, middleware is the functions that stand between request and response
//
//                                                                    // This is the logger function, identical to what's in the modules.js
//////const logger = (req, res, next)=>{                              // req, res, and next being passed in make it pair with app.get when we use this function
//////  const method = req.method;                                    // You must pass middleware to the next middleware function unless you're terminating the whole thing
//////  const url = req.url;                                          ////// For example, res.send('Testing') counts as a termination because it sends the results
//////  const time = new Date().getFullYear();
//////  console.log(method, url, time)
//////  next()                                                        // The next() function passes it to the next middleware
//}
//
//app.get('/', logger, (req, res)=>{                                  // logger here is the middleware. We're refrencing the above function/the function in modules.js
//  res.send('Home')                                                  // res.send('Whatever') stops the program and sends whatever is in the ''
//})
//
//app.get('/about', logger, (req, res)=>{                             // the logger function can be added to individual methods like this.
//  res.send('About')
//})
//
// app.get('/api/items', [logger, authorize], (req, res)=>{           // Use multiple middleware functions in the method (in this case, logger and authorize)
//   console.log(req.user);
//   res.send('Items')
// })
//
//app.use([logger, authorize]);                                       // app.use applies the middleware functions to all methods (get, send, etc).
//app.use('/api', logger);                                            // app.use also takes a path to limit the resources for which the function is used
// app.use(morgan('tiny'))                                            // app.use also takes middleware functions from third-party packages, for example 'tiny' from morgan
//
// app.listen(5000, ()=>{
//   console.log('Server is listening on 5000...');
// })
//
//
/////////////////////////////////////////HOW TO USE THE POST METHOD (BASICS)//////////////////////////////////////////////////////////////////
// const express = require('express');
// const app = express()

// const { people } = require('./data')

// app.use(express.static('./app/test/methods-public'))                        //static assets pulled from the methods-public folder. Needs /app/test/ because of where it is

// app.use(express.urlencoded({extended: false}))                              // Parse form data so that you post it
//                                                                             // 'extended: false' flag lets us parse URL-encoded data

// app.get('/api/people',(req, res)=>{                                         // Default method the browser performs
//     res.status(200).json({ success: true, data: people })                   // Get the data property (here the people array) and hardcode page success
// })

// app.post('/login', (req, res)=>{                                            // the path is needed for where to send the data
//     const { name, earSize } = req.body;                                     // Including a body in the Post method is crucial (that's the data)
//     if(name){                                                               // Checks if name field is empty
//         console.log(req.body, req.body.name, req.body.earSize);             // This returns the value corresponding to the key pair "name" and earSize from the form body
//         return res.status(200).send(
//             `Welcome ${name}! 
//             Your ears are ${earSize}!`)
//     }
//     res.status(401).send(                                                   // If nothing is returned (no name entered), it gives an error.
//         'Please tell us who you are and how big your ears are'
//         )
// })

// app.listen(5000, ()=>{
//     console.log('Server is listening at port 5000...');
// })
//
//
/////////////////////////////HOW TO USE THE POST METHOD WITH JAVASCRIPT//////////////////////////////////////////////////////////////////

// const express = require('express');
// const app = express()

// const { people } = require('./data')

// app.use(express.static('./app/test/methods-public'))                        //static assets pulled from the methods-public folder. Needs /app/test/ because of where it is

// app.use(express.urlencoded({extended: false}))                              // Parse form data so that you post it
//                                                                             // 'extended: false' flag lets us parse URL-encoded data

// app.use(express.json())                                                     // This gives us access to the json data in the HTTP request sent with javascript

// app.get('/api/people',(req, res)=>{                                         // Default method the browser performs
//     res.status(200).json({ success: true, data: people })                   // Get the data property (here the people array) and hardcode page success
// })

// app.post('/api/people', (req, res)=>{
//     const {name} = req.body                                                 // Because we used express.json() earler, we can now access the name value in body.
//     if (!name){                                                             // If there's no name, it gives an error.
//         res.status(400).json({
//             success: false, 
//             msg: 'Please tell us your name' })                              // With this error message
//     } 
//     res.status(201).json({success: true, person: name})
// })                                                                          // because the method is different, the URLs aren't doing the same thing here

// app.post('/login', (req, res)=>{                                            // the path is needed for where to send the data
//     const { name, earSize } = req.body;                                     // Including a body in the Post method is crucial (that's the data)
//     if(name){                                                               // Checks if name field is empty
//         console.log(req.body, req.body.name, req.body.earSize);             // This returns the value corresponding to the key pair "name" and earSize from the form body
//         return res.status(200).send(
//             `Welcome ${name}! 
//             Your ears are ${earSize}!`)
//     }
//     res.status(401).send(                                                   // If nothing is returned (no name entered), it gives an error.
//         'Please tell us who you are and how big your ears are'
//         )
// })

// app.listen(5000, ()=>{
//     console.log('Server is listening at port 5000...');
// })
//
//
////////////////HOW TO USE MONOGODB///////////////////////////////////////////////////////
//
//
//// MongoDB is a no-SQL, non-relational DB
//// Stores JSON
//// Free cloud hosting on ATLAS?
//
//// Doesn't care how the data is set up. Instead of tables, it has collections, which represent group items. Instead of rows, we have documents,
//// which represent single items. A document is a set of key value pairs. Can use many data types.
//
//// 
/////////////////////////////STRUCTURING REST API///////////////////////////////////////////////

//// We're structuing this as REST API because essentially, while we're building our server, we want to build an HTTP interface. So that the 
//// other apps, most likely our front-end ones, can interact with our data. That's how we view API in this scenario. 
//// REST stands for 'Representation State Transfer' and it is arguably the most popular API design pattern. 
//// Essentially, it's a patter that combines http verbs, route paths, and our resources (AKA data).
//// It's a pattern, not a strictly enforced structure.
//
//// You have the main list (customers, lists, tasks, items, whatever). You use getAllItems to get them and the createItem to create one, etc.
//// JSON is a normal with REST API.
//
//// This structure and our API allows users to perform CRUD operations. CRUD stands for create, read, update, and destroy. Those are typically 
//// the operates users want to perform on a given data. 

/////////////////////////////THE REASON BEHIND USING CONTROLLERS/////////////////////////////////

//// For the controllers themselves, we're essentially taking the logic of: 
//// router.route('./').get((req, res)=>{res.send('Something')}), where the logic inside is:
//// (req, res)=>{res.send('Something')}, 
//// and putting it in a separate file because eventually there will be way more logic than just res.send and it'll take up a ton of space.

/////////////////////////////MODELING WITH MONGOOSE//////////////////////////////////////////////

//// Models are fancy constructors compiled from schema definitions. An instance of a model is called a document (essentially a single submission). 
//// We set the schema in models/tasks.js and define the relevant fields that'll make up the document.
//// The first argument (Task) is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercase
//// version of your model.

/////////////////////////////////////////////////////////////////////////////////////////////////



//                                                                         // using api/ is just by convention to avoid overlap
//                                                                         //// using v1/ is for version for changing things
//                                                                         // Importance of controllers: As the app gets bigger, it won't be sustainable to 
//                                                                         //// just dump everything in the app.js.
// //
// const express = require('express');
// const app = express();
// const tasks = require('./routes/tasks.js')                         // The requires the routes defined in routes/tasks.js resource
// //
// const connectDB = require('./db/connect.js')                            // Requires the function that links to to the database
// //
// const path = require('path');                                           // Have to explicitly define the path to the .env file for some reason
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });  // Calls the middleware that hide variables in the .env file
// //

// // routes
// app.get('/hello', (req, res)=>{                                   
//   res.send('Task Manager App')
// })

// app.use('/api/v1/tasks', tasks)                                    // Sets root route for the tasks router
//                                                                         // Define our middleware
// app.use(express.json())                                                 //// Uses express middleware. If we don't use the json function, we won't have the data in req.body

// const port = 3000

// const start = async () =>{
//   try{                                                                  // Always use an try/catch block when using an async function. Only works if connectDB works.
//     await connectDB(process.env.DATABASE_URL)                           // process is a global variable
//     app.listen(port, console.log(`Server is listening on port ${port}...`))   // If it works, then it spins up the server 
//   } catch(error){                                                             // Otherwise, in logs an error in the console
//     console.log(error)
//   }
// }

// start()                                                                 // because we defined an asynchronous function, we also have to initialize it with start ()
