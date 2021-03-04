const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require("path");
const sessionRouter = require('./controller/sessionRouter');
const authRouter = require('./controller/authRouter');
const userRouter = require('./controller/userRouter');
const errorController = require('./controller/errorController');
dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "*.googleapis.com"],
    imgSrc: ["'self'"],
    fontSrc: ["'self'", "*.googleapis.com", "*.gstatic.com"]
  }
}))
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
})

app.use('/api/sessions', sessionRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use(errorController);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down...');
  server.close(() => {
    console.log('Process terminated.');
  })
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down...');
  server.close(() => {
    console.log('Process terminated.');
  })
});

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  process.exit(1);
})