const bcrypt = require("bcrypt");
const mysql = require('mysql');
const pool = require('./../model/database');
const AppError = require('./../utils/appError');

const getUser = (req, res, next) => {
  const getUser = `SELECT id, username, first_name, last_name, email FROM users WHERE id = ${req.query.u_id}`;
  pool.query(getUser, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    if(!results[0]){
      return next(new AppError('User not found', 403))
    }
    console.log(results[0]);
    res.status(200).send(results[0]);
  })
}

const updateUser = (req, res, next) => {
  let checkUser = `SELECT email, id FROM users WHERE email = ?`;
  const checkUserInserts = [req.body.email];
  checkUser = mysql.format(checkUser, checkUserInserts);
  pool.query(checkUser, function(err, results){
    if (err) {
      return next(new AppError(err, 500));
    }
    if (results[0].id !== parseInt(req.query.u_id) || results.length > 1) {
      return next(new AppError('Email is already in use.', 400));
    }
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
        let updatedUser = `UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ${req.query.u_id}`;
        const updatedValues = [req.body.first_name, req.body.last_name, req.body.email, req.body.password];
        updatedUser = mysql.format(updatedUser, updatedValues);
        pool.query(updatedUser, function(err, results) {
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
  });
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
};

module.exports = { getUser, updateUser, deleteUser };