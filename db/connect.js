const mongoose = require('mongoose')                                          // Makes the mongoose package available

const connectDB = (url) => {                                                  // Creates function that takes URL
  return mongoose.connect(url, {                                              //// and connects the app to the database passed in at that URL 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB                                                    // Exports the function so it can be used in other files