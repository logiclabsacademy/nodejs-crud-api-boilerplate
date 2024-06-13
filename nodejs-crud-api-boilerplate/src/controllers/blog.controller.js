const Blog = require("../models/blog.model");

exports.createBlog = async (req, res, next) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};
exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
};
exports.updateBlog = async (req, res, next) => {
  try {
    const updates = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
};
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
};
