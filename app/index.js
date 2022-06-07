/////////////////////////////THE PRIMARY FILE, WHAT ACTUALLY GETS RUN. EVERYTHING HAS TO CONNECT HERE!/////////////////////////////
//
//////Essentially this is the data and the other one is the function...
//
const passedNumbers = require('./numbers')                                  // This pulls the data from the numbers.js file
const calc = require('./modules')                                           // This pulls the functions from the module.js file
//
const result = calc.sum(passedNumbers.numbersToAdd)                         // This uses sum function from the modules file to the numbersToAdd array in numbers file
//console.log(`The result is: ${result}`)
//
//
//
/////////////This function returns numbers bigger than 2.
//
//
const result2 = passedNumbers.numbers2.filter(calc.isBiggerThanTwo)
//
//console.log(`The result is: ${result2}`)
//
//
//
//
/////////////////////////////BUILT-IN OS MODULE (WITHIN NODE)/////////////////////////////
//
const os = require('os')
//
// info about current user
//
const user = os.userInfo()
//console.log(user);
//
// method returns the system uptime in seconds
//console.log(`The system uptime is ${os.uptime} seconds`);
//
const currentOS = {
  name:os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
}
//console.log(currentOS);
//
//
/////////////////////////////BUILT-IN PATH MODULE (WITHIN NODE)/////////////////////////////
//
//
const path = require('path')
//console.log(path.sep);                                                                        // Shows what character separates folders/files in the system
//
//const filePath = path.join('contentFolderName', 'subfolderName', 'specificFile.txt')          // This gives the file path of a specific file
//console.log(filePath)
//
//const base = path.basename(filePath)                                                          // Gives the base file name at filePath
//console.log(base)
//
// Returns an absolute path! __dirname refers to the direction that the index file (this file!) is in
//const absolute = path.resolve(__dirname, 'contentFolderName', 'subfolderName', 'specificFile.txt')
//console.log(absolute)
//
//
/////////////////////////////BUILT-IN FS MODULE (WITHIN NODE) -- SYNCHRONOUS/////////////////////////////
//
//
const {readFileSync, writeFileSync } = require('fs');
//
const first = readFileSync('./content/first.txt', 'utf8')                                     //  Requires path and encoding
const second = readFileSync('./content/second.txt', 'utf8')
//
//console.log(first, second);
//
writeFileSync(
  './content/result-sync.txt', 
  `Here is the result: ${first}, ${second}`,
  {flag: 'a'}                                                                                 // This flag makes it *not overwrite the file. It overwrites by default!)
  )
//
//
/////////////////////////////BUILT-IN FS MODULE (WITHIN NODE) -- ASYNCHRONOUS/////////////////////////////
//
//
const {readFile, writeFile } = require('fs');                                                 // Needs a callback to finish
//
readFile('./content/first.txt', 'utf8', (err, result)=>{                                     // Third argument (in () is the callback and includes an error message)
  if(err){
//    console.log(err);
    return;
  }
  const first = result;
  readFile('./content/second.txt', 'utf8', (err, result)=>{
    if(err){
//      console.log(err);
      return;
    }
    const second = result;
    writeFile(
      './content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      {flag : 'a'},
      (err, result) => {
        if(err){
//          console.log(err);
          return;
        }
//        console.log(result)
      }
    )
  })
})
//
//
/////////////////////////////BUILT-IN HTTP MODULE (WITHIN NODE)/////////////////////////////
//
//
//const http = require('http');
//
//const server = http.createServer((req, res)=>{                                                  // req = request object, res = response object
//    if(req.url === '/'){
//      res.end('Welcome to our home page')
//    }
//    if(req.url === '/about'){
//      res.end('This is our about page')
//    }
//    res.end(`<h1>Oops!</h1><p>You are lost.</p><a href="/">Home</a>`)
//  })
//
//server.listen(5000);