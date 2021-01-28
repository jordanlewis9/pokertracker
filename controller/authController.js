const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const pool = require('./../model/database');

const tokenForUser = (user) => {
  return jwt.sign({ sub: user.id }, process.env.SECRET, {
    expiresIn: '12h'
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

const signin = (req, res) => {
  const { username, password } = req.body;
  const getUser = `SELECT * FROM users WHERE username = '${username}'`;
  pool.query(getUser, function(err, results){
    if (err) {
      throw err;
    }
    const user = results[0];
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Incorrect username or password'
      });
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) throw err;
      if (result) {
        return res.status(200).send({
          token: tokenForUser(user),
          id: user.id
        });
      } else {
        return res.status(400).json({
          status: 'failed',
          message: 'Incorrect username or password'
        });
      }
    })
  })
};

const signup = (req, res) => {
  let { username, first_name, last_name, email, password } = req.body;
  const checkUser = `SELECT * FROM users WHERE username = '${username}' OR email ='${email}'`;
  pool.query(checkUser, function(err, results) {
    if (err) throw err;
    if (results[0]) {
       return res.status(400).send(results);
    }
  });
  const saltRounds = 12;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) throw err;
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) throw err;
      password = hash;
      const newUser = `INSERT INTO users (username, first_name, last_name, email, password, ip) VALUES ('${username}', '${first_name}', '${last_name}', '${email}', '${password}', '127')`;
      pool.query(newUser, function(err, results){
        if (err) throw err;
        console.log("====================================================");
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