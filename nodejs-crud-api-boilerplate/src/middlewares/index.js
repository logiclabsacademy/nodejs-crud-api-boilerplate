const authMiddleware = require('./auth.middleware');
const errorMiddleware = require('./error.middleware');
const validationMiddleware = require('./validation.middleware');

module.exports = {
  authMiddleware,
  errorMiddleware,
  validationMiddleware,
};
