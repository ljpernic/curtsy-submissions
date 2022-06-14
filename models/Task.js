const mongoose = require('mongoose')                                    // Makes the mongoose package available in this function

const TaskSchema = new mongoose.Schema({                                // Sets the schema for all the documents/objects we'll have in our collection/database
  name: {                                                               // Adds validators
    type: String,                                                       // Forces name submission to be a string
    required: [true, 'must provide name'],                              // Requires the field and offers a brief error message
    trim: true,                                                         // Cuts white space before and after submission
    maxlength: [50, 'name can not be more than 20 characters'],         // Sets maxlength of submission entry for that field
  },
  completed: {                                                          // Second field of submission
    type: Boolean,
    default: false,                                                     // As tasks are added, they won't be completed by default
  },
})

module.exports = mongoose.model('Task', TaskSchema)                     // First parameter is the name that's called for the function. Second is the schema itself.