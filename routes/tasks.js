const express = require('express')
const router = express.Router()                                                         // This sets up the router

const {                                                                                 // Controllers defined by controllers/tasks.js
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')
                                                                                        // the '/' is effectively the root path when it's called in app.js 
                                                                                        //// It calls the controller function 'getAllTasks' defined in controllers/tasks.js                                                                                       //// 
                                                                                        //// And uses that to complete the action here 
                                                                                        //// Uses the createTask controller inside post method

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)                  //// Gets task for specific id and either updates it or deletes it

module.exports = router
