const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const pool = require('./../model/database');
const AppError = require('./../utils/appError');

const tokenForUser = (user) => {
  return jwt.sign({ sub: user.id }, process.env.SECRET, {
    expiresIn: '24h'
  })
};

// WILL NEED PROTECTED!
const getUser = (req, res) => {
  const getUser = `SELECT id, username, email, ip FROM users WHERE id = ${req.query.u_id}`;
  pool.query(getUser, function(err, results){
    if (err) throw err;
    console.log(results[0]);
    res.status(200).send(results[0]);
  })
}

const signin = (req, res, next) => {
  const { username, password } = req.body;
  const getUser = `SELECT * FROM users WHERE username = '${username}'`;
  pool.query(getUser, function(err, results){
    if (err) {
      next(new AppError('Something went wrong', 500));
    }
    const user = results[0];
    if (!user) {
      next(new AppError('Incorrect username or password', 400));
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        next(new AppError('Something went wrong', 500));
      }
      if (result) {
        return res.status(200).send({
          token: tokenForUser(user),
          id: user.id
        });
      } else {
        next(new AppError('Incorrect username or password', 400));
      }
    })
  })
};

const signup = (req, res, next) => {
  let { username, first_name, last_name, email, password } = req.body;
  const checkUser = `SELECT username, email FROM users WHERE username = '${username}' OR email ='${email}'`;
  pool.query(checkUser, function(err, results) {
    if (err) next(new AppError('Something went wrong', 500));
    if (results[0]) {
       if(results[0].username === username){
         next(new AppError('Username is already in use. Please choose a different username', 400))
       } else if (results[0].email === email) {
         next(new AppError('Email is already in use. Please use a different email', 400))
       } else {
         next(new AppError('Something went wrong', 500));
       }
    }
  });
  const saltRounds = 12;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) next(new AppError('Something went wrong', 500));
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) next(new AppError('Something went wrong', 500));
      password = hash;
      const newUser = `INSERT INTO users (username, first_name, last_name, email, password, ip) VALUES ('${username}', '${first_name}', '${last_name}', '${email}', '${password}', '127')`;
      pool.query(newUser, function(err, results){
        if (err) next(new AppError('Something went wrong', 500));
        res.status(201).json({
          message: 'success'
        })
      })
    })
  })
};

const updateUser = (req, res) => {
  let { username, first_name, last_name, email, password, id } = req.body;
  const saltRounds = 12;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) throw err;
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) throw err;
      password = hash;
      let updatedUser = 'UPDATE users SET ';
      updatedUser += `username = '${username}', `;
      updatedUser += `first_name = '${first_name}', `;
      updatedUser += `last_name = '${last_name}', `;
      updatedUser += `email = '${email}', `;
      updatedUser += `password = '${password}' `;
      updatedUser += `WHERE id = ${id}`;
      pool.query(updatedUser, function(err, results) {
        if(err) throw err;
        res.status(200).json({
          message: 'success'
        })
      })
    })
  })
};

module.exports = { getUser, signin, signup, updateUser};