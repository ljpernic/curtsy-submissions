const Task = require('../models/Task')                                                  // Makes available the schema defined in models/Task.js
const asyncWrapper = require('../middleware/async')                                     // Makes available the standardized function defined in middleware/async.js
const { createCustomError } = require('../errors/custom-error')                         // Makes available the custom errors

const getAllTasks = asyncWrapper(async (req, res) => {                                  // Async function to get all tasks from database--
  const tasks = await Task.find({})                                                     // Uses the .find function to find all tasks
  res.status(200).json({ tasks })                                                       //// and returns them as an array that can be parsed by user-facing html
})

const createTask = asyncWrapper(async (req, res) => {                                   // Uses req.body json to create and post new task
  const task = await Task.create(req.body)
  console.log(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {                                // Gets individual task
  const { id: taskID } = req.params                                                     // Finds taskID based on database id using req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {                                                                          // If the task is not found, it returns an error
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res, next) => {                             // Deletes an individual task
  const { id: taskID } = req.params                                                     // Finds taskID based on database id using req.params
  const task = await Task.findOneAndDelete({ _id: taskID })                             // Uses MongoDB function findOneAndDelete to search and 
  if (!task) {                                                                          //// remove object with that taskID 
    return next(createCustomError(`No task with id : ${taskID}`, 404))                  // Otherwise, shows a 404 error.
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res, next) => {                             // Updates an individual
  const { id: taskID } = req.params                                                     // Finds taskID based on database id using req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {                 // Uses MongoDB function findOneAndDelete to search and 
    new: true,                                                                          //// updates object based on data passed in through  
    runValidators: true,                                                                //// req.body
  })
  if (!task) {                                                                          // Otherwise, shows a 404 error.
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})

module.exports = {                                                                      // Exports modules defined here for use in other files
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}