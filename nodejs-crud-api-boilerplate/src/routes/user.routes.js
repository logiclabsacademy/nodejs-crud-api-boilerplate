const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

const router = express.Router();

router.get('/me', authMiddleware, userController.getUser);
router.put('/me', authMiddleware, userController.updateUser);
router.delete('/me', authMiddleware, userController.deleteUser);

module.exports = router;
