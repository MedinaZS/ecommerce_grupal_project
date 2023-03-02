const Category = require('../models/category.model');


module.exports.all = (req, res) => {
  Category.aggregate([
    {
      "$match": {}
    },
    {
      "$lookup": {
        "from": "products",
        "localField": "_id",
        "foreignField": "categories",
        "as": "productsCount"
      }
    },
    {
      $addFields: {
        productsCount: {
          $size: "$productsCount"
        }
      }
    }
  ]).exec((error, categories) => {
    if (error) {
      res.status(400).json({ message: "Something went wrong when get all categories", error: error });
    };
    res.json({ categories: categories })
  })
};
module.exports.create = (req, res) => {
  Category.create(req.body)
    .then((category) => res.json({ category: category }))
    .catch((error) => res.status(400).json({ message: "Something went wrong when create a category", error: error }));
};

module.exports.find = (req, res) => {
  Category.findOne({ _id: req.params.id })
    .then((category) => res.json({ category: category }))
    .catch((error) => res.status(400).json({ message: "Something went wrong then find a category", error: error }));
};

module.exports.update = (req, res) => {

  Category.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then((category) => res.json({ category: category }))
    .catch((error) => res.status(400).json({ message: "Something went wrong when update category", error: error }));
};

module.exports.delete = (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((error) => res.status(400).json({ message: "Something went wrong when delete category", error: error }));
};