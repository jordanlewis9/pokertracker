const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const sessionController = require('./controller/sessionController');
const authController = require('./controller/authController');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'poker_tracker'
});

// connection.connect(err => {
//   if (err) {
//     return console.error(`Error: ${err.message}`)
//   };
//   console.log('Connected to MySQL');
// });

app.use('/api/sessions', sessionController);
app.use('/api/auth', authController);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

module.exports = pool;