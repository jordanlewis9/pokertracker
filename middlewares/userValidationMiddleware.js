const AppError = require('./../utils/appError');

const validationMsg = (category) => {
  return `invalid ${category} format; `;
}

const userValidationMiddleware = (req, res, next) => {
  let msg = "";
  let fields;
  if (req.path === '/user') {
    console.log('hi')
    fields = ["first_name", "last_name", "email", "password"];
  } else if (req.path === '/signin') {
    fields = ['username', 'password'];
  } else if (req.path === '/signup') {
    fields = ['username', 'first_name', 'last_name', 'email', 'password'];
  } else {
    return next(new AppError('Endpoint not valid', 400));
  }

  for (const value in req.body) {
    if (fields.indexOf(value) === -1) {
      return next(new AppError(`Improper field ${value} added`, 400))
    }
    if (!req.body[value] && req.body[value] !== 0) {
      msg += `${value} cannot be empty `;
    }
    if (value === "first_name" || value === "last_name") {
      const nameRegex = /^[a-zA-Z]{2,}(-[a-zA-Z]{2,}|\s[a-zA-Z]{2,})?(\.)?$/i;
      if (!nameRegex.test(req.body[value])) {
        msg += validationMsg(value);
      }
    }
    if (value === "username") {
      const usernameRegex = /^[a-zA-Z0-9]{4,16}$/;
      if (!usernameRegex.test(req.body[value])) {
        msg += validationMsg(value);
      }
    }
    if (value === "email") {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,63}@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/i;
      if (!emailRegex.test(req.body[value])) {
        console.log('email failed');
        console.log(value);
        msg += validationMsg(value);
      }
    }
    if (value === "password") {
      const noTags = /<.+>/ig;
      if (req.path === '/signup') {
        const specialChar = /\W/;
        const uppercaseChar = /[A-Z]/;
        const numberChar = /[0-9]/;
        const numberOfChars = /^.{8,64}$/;
        if (noTags.test(req.body[value])) {
          msg += validationMsg(value);
        } else if (!numberOfChars.test(req.body[value])) {
          msg += "Password must be at least 8 characters long; "
        } else if (!specialChar.test(req.body[value]) || !uppercaseChar.test(req.body[value]) || !numberChar.test(req.body[value])) {
          msg += "Password must contain at least 1 special character, 1 uppercase letter, and 1 number; "
        }
      } else {
        if (noTags.test(req.body[value])) {
          return next(new AppError('Improper input', 400));
        }
      }
    }
    fields.splice(fields.indexOf(value), 1);
  }
  if (fields.length > 0) {
    msg += `${fields.join(' ')} cannot be omitted; `
  }
  if (msg) {
    return next(new AppError(msg, 400))
  } else {
    next();
  }
}

module.exports = userValidationMiddleware;