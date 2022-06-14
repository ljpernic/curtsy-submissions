const express = require('express')
const router = express.Router()                                                         // This sets up the router

const {                                                                                 // Controllers defined by controllers/submissions.js
  getAllSubmissions,
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission,
  editSubmission,
} = require('../controllers/submissions')
                                                                                        // the '/' is effectively the root path when it's called in app.js 
                                                                                        //// It calls the controller function 'getAllSubmissions' defined 
                                                                                        //// in controllers/submissions.js and uses that to complete the action here 
                                                                                        //// Uses the createSubmission controller inside post method

router.route('/').get(getAllSubmissions).post(createSubmission)
router.route('/:id').get(getSubmission).patch(updateSubmission).delete(deleteSubmission)   //// Gets submission for specific id and either updates it or deletes it

module.exports = router
