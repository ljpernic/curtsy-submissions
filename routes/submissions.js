const express = require('express')
const router = express.Router()                                                               // Sets up the router.

const {                                                                                       // Imports controllers defined by controllers/submissions.js.
  getAllSubmissionsStatic,
  getAllSubmissions,
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission,
  editSubmission,
} = require('../controllers/submissions')
router.route('/').get(getAllSubmissions).post(createSubmission)                               // the '/' is effectively the root path when it's called in app.js, i.e.,
router.route('/static').get(getAllSubmissionsStatic)                                          //// api/v1/submissions/, with /static being added onto it for this method.
router.route('/:id').get(getSubmission).patch(updateSubmission).delete(deleteSubmission)      //// Basically, these assign controller functions imported from 
                                                                                              //// controllers/submissions.js to the routes defined in app.js ('/'), 
                                                                                              //// and use the given controller inside the given route.

module.exports = router                                                                       // Makes the router available for other files.


