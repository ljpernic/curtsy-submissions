const Reader = require('../models/Reader')                                              // Makes available the schema defined in models/Reader.js
const asyncWrapper = require('../middleware/async')                                     // Makes available the standardized function defined in middleware/async.js
const { createCustomError } = require('../errors/custom-error')                         // Makes available the custom errors

const getAllReaders = asyncWrapper(async (req, res) => {                                  // Async function to get all readers from database--
  const readers = await Reader.find({})                                                     // Uses the .find function to find all readers
  res.status(200).json({ readers })                                                       //// and returns them as an array that can be parsed by user-facing html
})

const addReader = asyncWrapper(async (req, res) => {                                   // Uses req.body json to create and post new reader
  const reader = await Reader.create(req.body)
//  console.log(req.body)
  res.status(201).json({ reader })
})

const getReader = asyncWrapper(async (req, res, next) => {                                // Gets individual reader
  const { id: readerID } = req.params                                                     // Finds readerID based on database id using req.params
  const reader = await Reader.findOne({ _id: readerID })
  if (!reader) {                                                                          // If the reader is not found, it returns an error
    return next(createCustomError(`No reader with id : ${readerID}`, 404))
  }
  res.status(200).json({ reader })
})

const deleteReader = asyncWrapper(async (req, res, next) => {                             // Deletes an individual reader
  const { id: readerID } = req.params                                                     // Finds readerID based on database id using req.params
  const reader = await Reader.findOneAndDelete({ _id: readerID })                             // Uses MongoDB function findOneAndDelete to search and 
  if (!reader) {                                                                          //// remove object with that readerID 
    return next(createCustomError(`No reader with id : ${readerID}`, 404))                  // Otherwise, shows a 404 error.
  }
  res.status(200).json({ reader })
})

const updateReader = asyncWrapper(async (req, res, next) => {                             // Updates an individual
  const { id: readerID } = req.params                                                     // Finds readerID based on database id using req.params
  const reader = await Reader.findOneAndUpdate({ _id: readerID }, req.body, {                 // Uses MongoDB function findOneAndDelete to search and 
    new: true,                                                                          //// updates object based on data passed in through  
    runValidators: true,                                                                //// req.body
  })
  if (!reader) {                                                                          // Otherwise, shows a 404 error.
    return next(createCustomError(`No reader with id : ${readerID}`, 404))
  }
  res.status(200).json({ reader })
})

module.exports = {                                                                      // Exports modules defined here for use in other files
  getAllReaders,
  addReader,
  getReader,
  updateReader,
  deleteReader,
}