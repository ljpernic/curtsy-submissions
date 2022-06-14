const { CustomAPIError } = require('../errors/custom-error')                            // Makes the functions defined in errors/custom-error.js available
const errorHandlerMiddleware = (err, req, res, next) => {                               // Creates function that uses functions from custom-error
  if (err instanceof CustomAPIError) {                                                  // If there is an error with the API in this instance, show customAPIError.
    return res.status(err.statusCode).json({ msg: err.message })                        //// then return appropriate status code and error message
  }
  return res.status(500).json({ msg: 'Something went wrong, please try again' })        // Otherwise, show generic error and status code.
}

module.exports = errorHandlerMiddleware                                                 // Makes the function defined here available in other files