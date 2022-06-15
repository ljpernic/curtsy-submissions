const express = require('express')
const router = express.Router()                                                         // This sets up the router

const {                                                                                 // Controllers defined by controllers/readers.js
  getAllReaders,
  addReader,
  getReader,
  updateReader,
  deleteReader,
  editSubmission,
} = require('../controllers/readers')
                                                                                        // the '/' is effectively the root path when it's called in app.js 
                                                                                        //// It calls the controller function 'getAllReaders' defined 
                                                                                        //// in controllers/readers.js and uses that to complete the action here 
                                                                                        //// Uses the createReader controller inside post method

router.route('/').get(getAllReaders).post(addReader)
router.route('/:id').get(getReader).patch(updateReader).delete(deleteReader)   //// Gets reader for specific id and either updates it or deletes it

module.exports = router
