const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const env = require('../config/env.config');

exports.register = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  return newUser.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, env.jwtSecret, { expiresIn: '1h' });
  return token;
};

exports.getUser = async (id) => {
  const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

exports.updateUser = async (id, updates) => {
  const user = await User.findByIdAndUpdate(id, updates);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new Error('User not found');
    }
    return { message: 'User deleted' };
}



