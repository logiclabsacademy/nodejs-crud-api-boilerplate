const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const blogRoutes = require('./blog.routes');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/blogs', blogRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' });
});
module.exports = router;
