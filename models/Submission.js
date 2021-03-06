const mongoose = require('mongoose')                                    // Makes the mongoose package available in this function

const SubmissionSchema = new mongoose.Schema({                          // Sets the schema for all the documents/objects we'll have in our collection/database
  name: {                                                               // Adds validators
    type: String,                                                       // Forces name submission to be a string
    required: [true, 'Please provide a name'],                          // Requires the field and offers a brief error message
    trim: true,                                                         // Cuts white space before and after submission
    maxlength: [50, 'Max length is 50 characters'],                     // Sets maxlength of submission entry for that field
  },
  email: {                                                              // Adds validators
    type: String,                                                       // Forces name submission to be a string
    required: [true, 'Please provide an email address'],                // Requires the field and offers a brief error message
    trim: true,                                                         // Cuts white space before and after submission
    maxlength: [50, 'Max length is 50 characters'],                     // Sets maxlength of submission entry for that field
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Max length is 100 characters'],
  },
  type: {
    type: String,
    required: [true, 'Please choose a type'],
  },
  wordCount: {
    type: Number,
    required: [true, 'Numbers only please'],
    trim: true,
    maxlength: [4, 'Max story length is 6000 words'],
  },
  file: {
    type: Buffer,
    required: [true, 'Please upload a file'],
  },
  coverLetter: {
    type: String,
    required: [false],
    trim: true,
    maxlength: [3000],
  },
  reader: {
    type: String,
    default: 'unassigned',                                              // As submissions are added, they won't have a reader by default
  },
  status: {
    type: String,
    default: 'Open',                                                    // As submissions are added, they start with status "open"
    enum: {
      values: [                                                         // Limits the value of "status" to only these possibilities
        'Open', 
        'In Progress', 
        'Rejected', 
        'Revision Requested',
        'Accepted',
        'Unassigned'
      ],
      message: '{VALUE} is not supported'                               // Returns error if value isn't on the list
    },                 
  },
  createdAt: {
    type: Date,
    default: Date.now(),                                                // As submissions are added, the date is automatically added
  },
})

module.exports = mongoose.model('Submission', SubmissionSchema)         // First parameter is the name given the function that creates individual collections. 
                                                                        //// Second is the schema itself.