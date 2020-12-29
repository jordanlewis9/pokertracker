const router = require('express').Router();
const pool = require('./../model/database');

router.post('/new', (req, res) => {
  const { user_id, stake, limit_type, game, venue, buyin, cashout, date_play, time_length } = req.body;
  const newSession = `INSERT INTO sessions (user_id, stake, limit_type, game, venue, buyin, cashout, date_play, time_length) VALUES (${user_id}, '${stake}', '${limit_type}', '${game}', '${venue}', ${buyin}, ${cashout}, '${date_play}', ${time_length})`;
  pool.query(newSession, function(err, results){
    pool.end();
    if (err) throw err;
    res.send(results);
  })
})

module.exports = router;