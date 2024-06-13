require('dotenv').config();

const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  mongoUri: process.env.MONGO_URI,
  securePort: process.env.SECURE_PORT || 3443,
  logLevel: process.env.LOG_LEVEL || 'info',
  logOutput: process.env.LOG_OUTPUT || 'console',
  logFile: process.env.LOG_FILE || 'app.log',
};


module.exports = env;
