const AppError = require('../utils/appError');

const validationMsg = (category) => {
  return `invalid ${category} format; `;
}

const sessionValidationMiddleware = (req, res, next) => {
  req.body.user_id = req.query.u_id;
  let msg = "";
  let fields = ["stake", "limit_type", "game", "venue", "buyin", "cashout", "date_play", "time_length", "user_id"];
  for (const value in req.body) {
    if (value === "profit" || value === "id") {
      continue;
    }
    if (fields.indexOf(value) === -1) {
      return new AppError(400, `Improper field ${value} added`);
    }
    if (!req.body[value] && req.body[value] !== 0) {
      msg += `${value} cannot be empty `;
    }
    if (value === "stake") {
      const stakeReg = /^\d{1,2}(\.\d{2})?(_|\/)\d{1,2}(\.\d{2})?$/;
      if (!stakeReg.test(req.body.stake)) {
        msg += validationMsg(value);
      }
    }
    if (value === "buyin" || value === "cashout") {
      const currencyReg = /^\d{1,6}\.?\d{0,2}?$/;
      if (!currencyReg.test(req.body[value])) {
        msg += validationMsg(value);
      }
    }
    if (value === "date_play") {
      const dateReg = /^(19|20)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
      if (!dateReg.test(req.body.date_play)) {
        msg += validationMsg(value);
      }
    }
    if (value === "time_length") {
      const timeReg = /^\d{2}:[0-5]\d$/;
      if (!timeReg.test(req.body.time_length)) {
        msg += validationMsg(value);
      }
    }
    fields.splice(fields.indexOf(value), 1);
  }
  if(fields.length > 0) {
    msg += `${fields.join(' ')} cannot be omitted; `
  }
  if (msg) {
    return next(new AppError(msg, 400));
  } else {
    next();
  }
}

module.exports = sessionValidationMiddleware;