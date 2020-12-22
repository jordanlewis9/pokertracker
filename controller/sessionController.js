const router = require('express').Router();
const connection = require('./../index');

router.post('/new', (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

module.exports = router;