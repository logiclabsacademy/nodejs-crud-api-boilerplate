const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/index');
const routes = require('./routes');
const env = require('./config/env.config');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev')); // Logging HTTP requests to the console

// Routes
app.use('/api', routes);

// MongoDB Connection
mongoose.connect(env.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use('*', (req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  errorHandler(err, req, res, next);
});

const port = process.env.PORT || 3000;
const securePort = process.env.SECURE_PORT || 3443;

module.exports = { app, port, securePort };
