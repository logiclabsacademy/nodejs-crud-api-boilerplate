const { User } = require('../models');

exports.getUserById = async (userId) => {
  return User.findById(userId);
};

exports.updateUser = async (userId, updates) => {
  return User.findByIdAndUpdate(userId, updates, { new: true });
};

exports.deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId);
};
