const router = require('express').Router();
const pool = require('./../model/database');

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

router.post('/signup');

module.exports = router;