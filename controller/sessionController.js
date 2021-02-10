const pool = require('./../model/database');
const AppError = require('./../utils/appError');

// Doesn't need error handler for 0 results as user has been verified.
// 0 results returned mean user has not logged a session yet.
const getAccumSessions = (req, res, next) => {
  const accumSessions = `SELECT SUM(profit) AS profit, SUM(time_length) AS time_length, COUNT(id) AS num_sessions FROM sessions WHERE user_id = ${req.query.u_id}`;
  pool.query(accumSessions, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    res.status(200).send(results[0]);
  })
};

const addNewSession = (req, res, next) => {
  const { stake, limit_type, game, venue, buyin, cashout, date_play, time_length } = req.body;
  const profit = cashout - buyin;
  const newSession = `INSERT INTO sessions (user_id, stake, limit_type, game, venue, buyin, cashout, date_play, time_length, profit) VALUES (${req.query.u_id}, '${stake}', '${limit_type}', '${game}', '${venue}', ${buyin}, ${cashout}, '${date_play}', ${time_length}, ${profit})`;
  pool.query(newSession, function(err, results){
    if (err) {
      return next(new AppError(err, 500));
    }
    if(results.affectedRows === 0) {
      return next(new AppError('Improper inputs. Please try again.', 400))
    }
    console.log(results);
    res.status(201).json({
      status: 'success',
      message: 'Session successfully added.'
    });
  })
};


const deleteSession = (req, res, next) => {
  const deleteSession = `DELETE FROM sessions WHERE id = ${req.query.session_id} AND user_id = ${req.query.u_id}`;
  pool.query(deleteSession, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    if(results.affectedRows === 0){
      return next(new AppError('Improper session credentials. Please adjust your credentials and try again.', 403));
    }
    res.status(204).json({
      status: 'success'
    });
  })
}

const getSession = (req, res, next) => {
  const getSession = `SELECT * FROM sessions WHERE id = ${req.query.session_id} AND user_id = ${req.query.u_id}`;
  pool.query(getSession, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    if(!results[0]){
      return next(new AppError('Improper session credentials. Please adjust your credentials and try again.', 403));
    }
    res.status(200).send(results[0])
  })
};

const editSession = (req, res, next) => {
  const { session_id, u_id } = req.query;
  const { stake, limit_type, game, venue, buyin, cashout, date_play, time_length } = req.body;
  const profit = cashout - buyin;
  let editSession = `UPDATE sessions SET stake = '${stake}', limit_type = '${limit_type}', game = '${game}', venue = '${venue}', `;
  editSession += `buyin = ${buyin}, cashout = ${cashout}, date_play = '${date_play}', time_length = ${time_length}, profit = ${profit} `;
  editSession += `WHERE id = ${session_id} AND user_id = ${u_id}`;
  pool.query(editSession, function(err, results){
    if(err) {
      return next(new AppError('Something went wrong', 500));
    }
    if(results.changedRows === 0) {
      return next(new AppError('Improper session credentials. Please adjust your credentials and try again.', 403));
    }
    res.status(200).json({
      status: 'success',
      message: 'Session successfully edited'
    });
  })
};

// Doesn't need error handler for 0 results as user has been verified.
// 0 results returned mean user has not logged a session yet.
const getAllSessions = (req, res) => {
  const getSessions = `SELECT *, DATE_FORMAT(date_play, '%m/%d/%Y') as played_date FROM sessions WHERE user_id = ${req.query.u_id} ORDER BY date_play`;
  pool.query(getSessions, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong. Please try again.', 500));
    }
    res.status(200).send(results);
  })
};

module.exports = {getAccumSessions, addNewSession, deleteSession, getSession, editSession, getAllSessions};