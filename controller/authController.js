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
const getUser = (req, res, next) => {
  const getUser = `SELECT id, username, email, ip FROM users WHERE id = ${req.query.u_id}`;
  pool.query(getUser, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    if(!results[0]){
      return next(new AppError('User not found', 403))
    }
    res.status(200).send(results[0]);
  })
}

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
  });
  const saltRounds = 12;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) next(new AppError('Something went wrong', 500));
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) next(new AppError('Something went wrong', 500));
      password = hash;
      const newUserInserts = [username, first_name, last_name, email, password];
      let newUser = `INSERT INTO users (username, first_name, last_name, email, password, ip) VALUES (?, ?, ?, ?, ?, '127')`;
      newUser = mysql.format(newUser, newUserInserts);
      pool.query(newUser, function(err, results){
        if (err) next(new AppError('Something went wrong', 500));
        res.status(201).json({
          message: 'success'
        })
      })
    })
  })
};

const updateUser = (req, res, next) => {
  let checkUser = `SELECT username, email FROM users WHERE username = ? OR email = ?`;
  const checkUserInserts = [username, email];
  checkUser = mysql.format(checkUser, checkUserInserts);
  pool.query(checkUser, function(err, results){
    if (err) {
      return next(new AppError(err, 500));
    }
    if (results[0]) {
      return next(new AppError('Username or email is already in use.', 400));
    }
  });
  const saltRounds = 12;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) {
      return next(new AppError('Something went wrong', 500));
    }
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) {
        return next(new AppError('Something went wrong', 500));
      }
      req.body.password = hash;
      let updatedUser = `UPDATE users SET ? WHERE id = ${req.query.u_id}`;
      pool.query(updatedUser, req.body, function(err, results) {
        if(err) {
          return next(new AppError('Something went wrong', 500));
        }
        if(results.affectedRows === 0){
          return next(new AppError('Incorrect input. Please try again.', 400))
        }
        res.status(200).json({
          status: 'success',
          message: 'User successfully updated'
        })
      })
    })
  })
};

const deleteUser = (req, res, next) => {
  const deleteUserQuery = `DELETE FROM users WHERE id = ${req.query.u_id}`;
  pool.query(deleteUserQuery, function(err, results) {
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    if (results.affectedRows === 0){
      return next(new AppError('Improper credentials', 400));
    }
    res.status(204).json({
      status: 'success'
    })
  })
}

module.exports = { getUser, signin, signup, updateUser, deleteUser };