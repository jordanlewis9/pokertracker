const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      console.log(err.message);
      return res.status(401).json({
        status: 'failed',
        message: err.message
      })
    }
    if (parseInt(req.query.u_id) !== decoded.sub) {
      return res.status(401).json({
        status: 'failed',
        message: 'Incorrect credentials'
      })
    } else {
      next();
    }
  })
};

module.exports = verifyUser;