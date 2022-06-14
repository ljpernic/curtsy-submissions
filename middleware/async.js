const asyncWrapper = (fn) => {                                            // Creates function for generic *req, res, next* to be called throughout
    return async (req, res, next) => {
      try {
        await fn(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
  
  module.exports = asyncWrapper