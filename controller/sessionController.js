const mysql = require('mysql');
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
  req.body.user_id = req.query.u_id;
  req.body.profit = req.body.cashout - req.body.buyin;
  let newSession = `INSERT INTO sessions SET ?`;
  pool.query(newSession, req.body, function(err, results){
    if (err) {
      return next(new AppError(err.sqlMessage, 500));
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
  let deleteSession = `DELETE FROM sessions WHERE id = ? AND user_id = ${req.query.u_id}`;
  const deleteSessionInserts = [req.query.session_id];
  deleteSession = mysql.format(deleteSession, deleteSessionInserts);
  pool.query(deleteSession, function(err, results){
    if (err) {
      return next(new AppError('Something went wrong', 500));
    }
    if(results.affectedRows === 0){
      return next(new AppError('Improper session credentials. Please adjust your credentials and try again.', 400));
    }
    res.status(204).json({
      status: 'success'
    });
  })
}

const getSession = (req, res, next) => {
  let getSession = `SELECT * FROM sessions WHERE id = ${req.query.session_id} AND user_id = ${req.query.u_id}`;
  const getSessionInserts = [req.query.session_id];
  getSession = mysql.format(getSession, getSessionInserts);
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
  req.body.profit = req.body.cashout - req.body.buyin;
  let editSession = `UPDATE sessions SET ? WHERE id = ? AND user_id = ${req.query.u_id}`;
  pool.query(editSession, [req.body, req.query.session_id], function(err, results){
    if(err) {
      return next(new AppError(err.sqlMessage, 500));
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