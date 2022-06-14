const notFound = (req, res) => res.status(404).send("The page you are looking for doesn't exist")           // Should pass a 404 page where the string is

module.exports = notFound                                                                                   // Makes this function available for use in other files