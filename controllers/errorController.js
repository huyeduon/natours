const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errorResponse.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0];

  const message = `Duplicate field value ${value} Please use different value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errror: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTError = () =>
  new AppError('Invalid token. Please login again!', 401);

const handleJWTExpiredEror = () =>
  new AppError('Your token has been expired, Please login again', 401);

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to clients
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR', err);
    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Do not shallow clone; just use original err for logic
    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

    if (error.name === 'TokenExpiredError') error = handleJWTExpiredEror(error);
    // Always set statusCode/status fallback
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    sendErrorProd(error, res);
  }
};
