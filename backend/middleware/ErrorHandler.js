// Custom 404 Not Found handler
const notFound = (req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  };
  
  // Error handling middleware
  const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Server Error" });
  };

  module.exports = {notFound,errorHandler}