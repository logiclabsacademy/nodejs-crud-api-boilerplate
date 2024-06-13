const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
};

const connectDB = async () => {
  try {
    const uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
