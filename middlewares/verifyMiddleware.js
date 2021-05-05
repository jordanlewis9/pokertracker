const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const verifyUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      if(err.name === "TokenExpiredError") {
        return next(new AppError('Your token has expired', 403));
      }
      return next(new AppError('Something went wrong', 500));
    }
    if (parseInt(req.query.u_id) !== decoded.sub) {
      return next(new AppError('Incorrect credentials', 401));
    } else {
      next();
    }
  })
};

module.exports = verifyUser;