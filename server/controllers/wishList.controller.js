const jwt = require("jsonwebtoken");
const WishList = require("../models/wishList.model");
const Cart = require('../models/cart.model');
const secret = process.env.SECRET_KEY;

module.exports.wishList = (req, res) => {
  jwt.verify(req.cookies.userToken, secret, (err, payload) => {
    if (!err) {
      WishList.findOne({ user: payload._id }).populate('products.product')
        .then((wishList) => {
          if (!wishList) {
            const newWishList = WishList.create({ user: payload._id, products: [] })
            res.json({ wishList: newWishList })
          }
          res.json({ wishList: wishList })
        })
        .catch((error) => res.status(400).json({ message: "Something went wrong then find a wishList", error: error }));
    }
  });
};

module.exports.find = (req, res) => {
  WishList.findOne({ _id: req.params.id }).populate('products.product')
    .then((wishList) => res.json({ wishList: wishList }))
    .catch((error) => res.status(400).json({ message: "Something went wrong then find a wishList", error: error }));
};

module.exports.update = async (req, res) => {
  try {
    await WishList.updateOne({ _id: req.params.id, "products.product": { $ne: req.body.product } }, {
      $push: { "products": { "product": req.body.product } }
    });
    await WishList.findOne({ _id: req.params.id }).populate('products.product')
      .then((wishList) => res.json({ wishList: wishList }))
  } catch (error) {
    res.status(400).json({ message: "Something went wrong then find a wishList", error: error })
  }
};

module.exports.delete = async (req, res) => {
  try {
    await WishList.updateOne({ _id: req.params.id }, {
      $pull: { "products": { "product": req.body.product } }
    });
    await WishList.findOne({ _id: req.params.id }).populate('products.product')
      .then((wishList) => res.json({ wishList: wishList }))
  } catch (error) {
    res.status(400).json({ message: "Something went wrong then find a wishList", error: error })
  }
};

module.exports.moveToCart = async (req, res) => {
  try {
    await WishList.updateOne({ _id: req.params.id }, {
      $pull: { "products": { "product": req.body.product } }
    });

    const wL = await WishList.findOne({ _id: req.params.id }).populate('products.product')

    await Cart.bulkWrite(
      [
        {
          updateOne: {
            filter: { _id: req.body.cart, "products.product": req.body.product },
            update: {
              $inc: {
                "products.$.quantity": 1
              }
            }
          }
        },
        {
          updateOne: {
            filter: {
              _id: req.body.cart,
              "products.product": { $ne: req.body.product }
            },
            update: {
              $push: {
                products: {
                  product: req.body.product,
                  quantity: 1,
                  serialized: true
                }
              }
            }
          }
        }
      ], {});

    const c = await Cart.findOne({ _id: req.body.cart }).populate('products.product');

    res.json({ cart: c, wishList: wL });

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong then move product to WishList", error: error })
  }
}