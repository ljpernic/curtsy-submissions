const Submission = require('../models/Submission')                                      // Makes available the schema defined in models/Submission.js
const asyncWrapper = require('../middleware/async')                                     // Makes available the standardized function defined in middleware/async.js
const { createCustomError } = require('../errors/custom-error')                         // Makes available the custom errors

const getAllSubmissionsStatic = asyncWrapper(async (req, res) => {                      // Async function to get all submissions from database--
  const submissions = await Submission.find({})                                         // Uses the .find function to find all submissions
  res.status(200).json({ submissions })                                                 //// and returns them as an array that can be parsed by user-facing html
})

const getAllSubmissions = asyncWrapper(async (req, res) => {                            // Async function to get all submissions from database--
  const submissions = await Submission.find({})                                         // Uses the .find function to find all submissions
  res.status(200).json({ submissions })                                                 //// and returns them as an array that can be parsed by user-facing html
})

const createSubmission = asyncWrapper(async (req, res) => {                             // Uses req.body json to create and post new submission
  const submission = await Submission.create(req.body)
//  console.log(req.body)
  res.status(201).json({ submission })
})

const getSubmission = asyncWrapper(async (req, res, next) => {                          // Gets individual submission
  const { id: submissionID } = req.params                                               // Finds submissionID based on database id using req.params
  const submission = await Submission.findOne({ _id: submissionID })
  if (!submission) {                                                                    // If the submission is not found, it returns an error
    return next(createCustomError(`No submission with id : ${submissionID}`, 404))
  }
  res.status(200).json({ submission })
})

const deleteSubmission = asyncWrapper(async (req, res, next) => {                       // Deletes an individual submission
  const { id: submissionID } = req.params                                               // Finds submissionID based on database id using req.params
  const submission = await Submission.findOneAndDelete({ _id: submissionID })           // Uses MongoDB function findOneAndDelete to search and 
  if (!submission) {                                                                    //// remove object with that submissionID 
    return next(createCustomError(`No submission with id : ${submissionID}`, 404))      // Otherwise, shows a 404 error.
  }
  res.status(200).json({ submission })
})

const updateSubmission = asyncWrapper(async (req, res, next) => {                       // Updates an individual
  const { id: submissionID } = req.params                                               // Finds submissionID based on database id using req.params
  const submission = await Submission.findOneAndUpdate({                                // Uses MongoDB function findOneAndDelete to search and
    _id: submissionID                                                                   //// updates object based on data passed in through   
  }, req.body, {                                                                        //// req.body
    new: true,
    runValidators: true,
  })
  if (!submission) {                                                                    // Otherwise, shows a 404 error.
    return next(createCustomError(`No submission with id : ${submissionID}`, 404))
  }
  res.status(200).json({ submission })
})

module.exports = {                                                                      // Exports modules defined here for use in other files
  getAllSubmissionsStatic,
  getAllSubmissions,
  createSubmission,
  getSubmission,
  updateSubmission,
  deleteSubmission,
}