const express = require('express');
const { blogController } = require('../controllers');
const { validationMiddleware } = require('../middlewares/index');
const { check } = require('express-validator');

const router = express.Router();

router.post(
    '/',
        [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('content').not().isEmpty().withMessage('Content is required'),
    ],
    validationMiddleware,
    blogController.createBlog
    );

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;

