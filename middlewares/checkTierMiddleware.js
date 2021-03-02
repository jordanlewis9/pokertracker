const pool = require('../model/database');
const AppError = require('../utils/appError');

const checkTierMiddleware = (req, res, next) => {
  const query = `SELECT id, tier FROM users WHERE id = ${req.query.u_id}`;
  pool.query(query, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    if (!results[0]) {
      return next(new AppError('Incorrect credentials', 400));
    }
    req.body.tier = results[0].tier;
    next();
  })
}

module.exports = checkTierMiddleware;