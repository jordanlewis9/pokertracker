const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) throw err;
    if (parseInt(req.query.u_id) !== decoded.sub) {
      return res.status(400).json({
        status: 'failed',
        message: 'Incorrect credentials'
      })
    } else {
      next();
    }
  })
};

module.exports = verifyUser;