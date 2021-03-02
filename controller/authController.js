const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const pool = require('./../model/database');
const AppError = require('./../utils/appError');

const tokenForUser = (user) => {
  return jwt.sign({ sub: user.id }, process.env.SECRET, {
    expiresIn: '24h'
  })
};

// WILL NEED PROTECTED!


const signin = (req, res, next) => {
  let { username, password } = req.body;
  let searchForUser = `SELECT * FROM users WHERE username = ?`;
  const inserts = [username];
  searchForUser = mysql.format(searchForUser, inserts);
  pool.query(searchForUser, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    const user = results[0];
    if (!user) {
       return next(new AppError('Incorrect username or password', 400));
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        return next(new AppError('Something went wrong', 500));
      }
      if (result) {
        return res.status(200).send({
          token: tokenForUser(user),
          id: user.id
        });
      } else {
        return next(new AppError('Incorrect username or password', 400));
      }
    })
  })
};

const signup = (req, res, next) => {
  let { username, first_name, last_name, email, password } = req.body;
  let checkUser = `SELECT username, email FROM users WHERE username = ? OR email = ?`;
  const checkUserInserts = [username, email];
  checkUser = mysql.format(checkUser, checkUserInserts);
  pool.query(checkUser, function(err, results) {
    if (err) next(new AppError('Something went wrong', 500));
    if (results[0]) {
       if(results[0].username === username){
         return next(new AppError('Username is already in use. Please choose a different username', 400))
       } else if (results[0].email === email) {
         return next(new AppError('Email is already in use. Please use a different email', 400))
       } else {
         return next(new AppError('Something went wrong', 500));
       }
    }
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) next(new AppError('Something went wrong', 500));
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) next(new AppError('Something went wrong', 500));
        password = hash;
        const newUserInserts = [username, first_name, last_name, email, password];
        let newUser = `INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)`;
        newUser = mysql.format(newUser, newUserInserts);
        pool.query(newUser, function(err, results){
          if (err) next(new AppError('Something went wrong', 500));
          res.status(201).json({
            message: 'success'
          })
        })
      })
    })
  }
  );
};

module.exports = { signin, signup };