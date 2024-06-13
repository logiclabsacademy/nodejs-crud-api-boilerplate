const express = require('express');
const { authController } = require('../controllers');
const { validationMiddleware } = require('../middlewares/index');
const { check } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validationMiddleware,
  authController.register
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
  ],
  validationMiddleware,
  authController.login
);

module.exports = router;
