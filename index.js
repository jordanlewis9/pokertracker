const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const sessions = require('./controller/sessionController');

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

app.use('/api/sessions', sessions);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

module.exports = pool;