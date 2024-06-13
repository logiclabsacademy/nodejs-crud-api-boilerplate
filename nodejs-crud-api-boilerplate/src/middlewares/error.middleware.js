const errorMiddleware = (err, req, res, next) => {
  
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
  next();
};


// Use this middleware in src/app.js
//like this:
// app.use('*',errorHandler);
module.exports = errorMiddleware;
