const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/error.middleware');
const routes = require('./routes');
const env = require('./config/env.config');