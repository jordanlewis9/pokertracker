module.exports = (err, req, res, next) => {
  console.log('got to error controller');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || error;
  console.log(Date.now())
  console.log(err);
  return res.status(err.statusCode).json({
    message: err.message
  });
}