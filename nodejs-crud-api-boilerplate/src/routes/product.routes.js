const express = require('express');
const { productController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

const router = express.Router();

router.post('/', authMiddleware, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
