module.exports = (err, req, res, next) => {
  console.log(err.message);
  err.statusCode = err.statusCode || 500;
  err.status = err.status;
  return res.status(err.statusCode).json({
    message: err.message
  });
}