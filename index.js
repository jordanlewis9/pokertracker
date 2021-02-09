const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sessionRouter = require('./controller/sessionRouter');
const authRouter = require('./controller/authRouter');
const errorController = require('./controller/errorController');
dotenv.config({ path: './.env' });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// connection.connect(err => {
//   if (err) {
//     return console.error(`Error: ${err.message}`)
//   };
//   console.log('Connected to MySQL');
// });

app.use('/api/sessions', sessionRouter);
app.use('/api/auth', authRouter);
app.use(errorController);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});