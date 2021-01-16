const router = require('express').Router();
const pool = require('./../model/database');

// WILL NEED PROTECTED!
router.get('/getUser/:id', (req, res) => {
  const getUser = `SELECT id, username, email, ip FROM users WHERE id = ${req.params.id}`;
  pool.query(getUser, function(err, results){
    if (err) throw err;
    console.log(results[0]);
    res.status(200).send(results[0]);
  })
})

router.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const getUser = `SELECT * FROM users WHERE username = '${username}'`;
  pool.query(getUser, function(err, results){
    if (err) {
      console.log(err);
      throw err;
    }
    const user = results[0];
    console.log(user);
    if(user.password !== password){
      return res.status(400).json({
        status: 'failed',
        message: 'Incorrect username or password'
      })
    }
    res.status(200).json({
      id: user.id
    });
  })
});

router.post('/signup', (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;
  const newUser = `INSERT INTO users (username, first_name, last_name, email, password, ip) VALUES ('${username}', '${first_name}', '${last_name}', '${email}', '${password}', '127')`;
  pool.query(newUser, function(err, results){
    if (err) throw err;
    console.log(results);
    res.status(201).json({
      message: 'success'
    })
  })
});

module.exports = router;