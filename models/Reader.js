const mongoose = require('mongoose')                                    // Makes the mongoose package available in this function

const ReaderSchema = new mongoose.Schema({                              // Sets the schema for all the documents/objects we'll have in our collection/database
  readerName: {                                                         // Adds validators
    type: String,                                                       // Forces name reader to be a string
    required: [true, 'Please provide a name'],                          // Requires the field and offers a brief error message
    trim: true,                                                         // Cuts white space before and after reader
    maxlength: [50, 'Max length is 50 characters'],                     // Sets maxlength of reader entry for that field
  },
  readerEmail: {
    type: String,
    default: '',                                                        // As reader are added, they won't have a reader by default
  },
  readerActive: {
    type: Boolean,
    default: true,                                                     // As reader are added, they won't have a reader by default
  },
})

module.exports = mongoose.model('Reader', ReaderSchema)                     // First parameter is the name that's called for the function. Second is the schema itself.