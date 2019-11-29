const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute');
const artistRouter = require('./routes/artistRoute');
const songRouter = require('./routes/songRoute');
const commentRouter = require('./routes/commentRoute');

const app = express();

// MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toUTCString();
  next();
});

module.exports = app;

app.use('/users', userRouter);
app.use('/artists', artistRouter);
app.use('/songs', songRouter);
app.use('/comments', commentRouter);

// ERROR HANDLING
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'FAIL';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.status = err.status || 'ERROR';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});
