const pool = require('./../model/database');
const AppError = require('./../utils/appError');

const checkNumAllowedSessionsMiddleware = (req, res, next) => {
  let checkUser = `SELECT COUNT(id) as num_sessions FROM sessions WHERE user_id = ${req.query.u_id}`;
  pool.query(checkUser, function(err, results){
    if (err) {
      return next (new AppError(err.sqlMessage, 500))
    }
    if (req.body.tier === "Free" && results[0].num_sessions >= 10) {
      return next (new AppError('Maximum number of free sessions reached. Subscribe to receive an unlimited number of sessions', 400));
    } else {
      delete req.body.tier;
      next();
    }
  })
}

module.exports = checkNumAllowedSessionsMiddleware;