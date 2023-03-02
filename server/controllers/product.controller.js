const Product = require('../models/product.model');

module.exports.all = async (req, res) => {
  await Product.find({}).sort('_id').populate('categories')
    .then((products) => res.json({ products: products }))
    .catch((error) => res.status(400).json({ message: "Something went wrong when get all products", error: error }));
};

module.exports.create = (req, res) => {
  Product.create(req.body)
    .then((product) => res.json({ product: product }))
    .catch((error) => res.status(400).json({ message: "Something went wrong when create a product", error: error }));
};

module.exports.find = (req, res) => {
  Product.findOne({ _id: req.params.id }).populate('categories')
    .then((product) => res.json({ product: product }))
    .catch((error) => res.status(400).json({ message: "Something went wrong then find a product", error: error }));
};

module.exports.update = (req, res) => {

  Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((product) => res.json({ product: product }))
    .catch((error) => res.status(400).json({ message: "Something went wrong when update product", error: error }));
};

module.exports.delete = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((error) => res.status(400).json({ message: "Something went wrong when delete product", error: error }));
};

module.exports.search = (req, res) => {
  let filter = {}

  if (req.query.category) {
    filter['categories'] = req.query.category
  }
  Product.find(filter).populate('categories')
    .then((products) => res.json({ products: products }))
    .catch((error) => res.status(400).json({ message: "Something went wrong then find a product", error: error }));
};