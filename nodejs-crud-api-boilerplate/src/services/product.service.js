const { Product } = require('../models');

exports.createProduct = async (productData) => {
  const newProduct = new Product(productData);
  return newProduct.save();
};

exports.getAllProducts = async () => {
  return Product.find();
};

exports.getProductById = async (productId) => {
  return Product.findById(productId);
};

exports.updateProduct = async (productId, updates) => {
  return Product.findByIdAndUpdate(productId, updates, { new: true });
};

exports.deleteProduct = async (productId) => {
  return Product.findByIdAndDelete(productId);
};
