const router = require('express').Router();
const pool = require('./../model/database');

router.get('/', (req, res) => {
  const getSessions = `SELECT *, DATE_FORMAT(date_play, '%m/%d/%Y') as played_date FROM sessions WHERE user_id = 1 ORDER BY date_play`;
  pool.query(getSessions, function(err, results){
    if (err) throw err;
    res.send(results);
  })
})

router.post('/new', (req, res) => {
  const { user_id, stake, limit_type, game, venue, buyin, cashout, date_play, time_length } = req.body;
  const profit = cashout - buyin;
  const newSession = `INSERT INTO sessions (user_id, stake, limit_type, game, venue, buyin, cashout, date_play, time_length, profit) VALUES (${user_id}, '${stake}', '${limit_type}', '${game}', '${venue}', ${buyin}, ${cashout}, '${date_play}', ${time_length}, ${profit})`;
  pool.query(newSession, function(err, results){
    if (err) throw err;
    res.send(results);
  })
})

module.exports = router;