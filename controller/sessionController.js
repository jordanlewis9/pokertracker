const router = require('express').Router();
const pool = require('./../model/database');

router.get('/', (req, res) => {
  const getSessions = `SELECT *, DATE_FORMAT(date_play, '%m/%d/%Y') as played_date FROM sessions WHERE user_id = 1 ORDER BY date_play`;
  pool.query(getSessions, function(err, results){
    if (err) throw err;
    res.status(200).send(results);
  })
})

router.get('/accum', (req, res) => {
  const accumSessions = `SELECT SUM(profit) AS profit, SUM(time_length) AS time_length, COUNT(id) AS num_sessions FROM sessions WHERE user_id = 1`;
  pool.query(accumSessions, function(err, results){
    if (err) throw err;
    res.status(200).send(results[0]);
  })
})

router.post('/new', (req, res) => {
  const { user_id, stake, limit_type, game, venue, buyin, cashout, date_play, time_length } = req.body;
  const profit = cashout - buyin;
  const newSession = `INSERT INTO sessions (user_id, stake, limit_type, game, venue, buyin, cashout, date_play, time_length, profit) VALUES (${user_id}, '${stake}', '${limit_type}', '${game}', '${venue}', ${buyin}, ${cashout}, '${date_play}', ${time_length}, ${profit})`;
  pool.query(newSession, function(err, results){
    if (err) throw err;
    res.status(201).send(results);
  })
})


router.delete('/delete/:session_id', (req, res) => {
  console.log(req.params.session_id);
  const deleteSession = `DELETE FROM sessions WHERE id = ${req.params.session_id}`;
  pool.query(deleteSession, function(err, results){
    if (err) throw err;
    res.status(204);
  })
})

router.get('/:id', (req, res) => {
  const getSession = `SELECT * FROM sessions WHERE id = ${req.params.id}`;
  pool.query(getSession, function(err, results){
    if (err) throw err;
    res.status(200).send(results[0])
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { stake, limit_type, game, venue, buyin, cashout, date_play, time_length } = req.body;
  const profit = cashout - buyin;
  let editSession = `UPDATE sessions SET stake = '${stake}', limit_type = '${limit_type}', game = '${game}', venue = '${venue}', `;
  editSession += `buyin = ${buyin}, cashout = ${cashout}, date_play = '${date_play}', time_length = ${time_length}, profit = ${profit} `;
  editSession += `WHERE id = ${id}`;
  pool.query(editSession, function(err, results){
    if(err) throw err;
    res.status(200).send(results[0]);
  })
})

module.exports = router;
