const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const Cart = require('../models/cart.model');
const WishList = require('../models/wishList.model');

module.exports.cart = (req, res) => {
  jwt.verify(req.cookies.userToken, secret, (err, payload) => {
    if (!err) {
      Cart.findOne({ user: payload._id }).populate('products.product')
        .then(async (cart) => {
          if (!cart) {
            const newCart = Cart.create({ user: payload._id, products: [] })
            await res.json({ cart: newCart })
          }
          await res.json({ cart: cart })
        })
        .catch((error) => res.status(400).json({ message: "Something went wrong then find a cart", error: error }));
    }
  });
};

module.exports.find = (req, res) => {
  Cart.findOne({ _id: req.params.id }).populate('products.product')
    .then((cart) => res.json({ cart: cart }))
    .catch((error) => res.status(400).json({ message: "Something went wrong then find a cart", error: error }));
};

module.exports.update = (req, res) => {
  try {
    Cart.bulkWrite(
      [
        {
          updateOne: {
            filter: { _id: req.params.id, "products.product": req.body.product },
            update: {
              $inc: {
                "products.$.quantity": req.body.quantity
              }
            }
          }
        },
        {
          updateOne: {
            filter: {
              _id: req.params.id,
              "products.product": { $ne: req.body.product }
            },
            update: {
              $push: {
                products: {
                  product: req.body.product,
                  quantity: req.body.quantity,
                  serialized: true
                }
              }
            }
          }
        }
      ], {}, async () => {
        await Cart.findOne({ _id: req.params.id }).populate('products.product')
          .then((cart) => res.json({ cart: cart }))
      });

  } catch (error) {
    res.status(400).json({ message: "Something went wrong then find a cart", error: error })
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Cart.updateOne({ _id: req.params.id }, {
      $pull: { "products": { "product": req.body.product } }
    });
    await Cart.findOne({ _id: req.params.id }).populate('products.product')
      .then((cart) => res.json({ cart: cart }))
  } catch (error) {
    res.status(400).json({ message: "Something went wrong then find a cart", error: error })
  }
};


module.exports.moveToWishList = async (req, res) => {
  try {
    await Cart.updateOne({ _id: req.params.id }, {
      $pull: { "products": { "product": req.body.product } }
    });

    const c = await Cart.findOne({ _id: req.params.id }).populate('products.product');

    await WishList.updateOne({ _id: req.body.wishList, "products.product": { $ne: req.body.product } }, {
      $push: { "products": { "product": req.body.product } }
    });

    const wL = await WishList.findOne({ _id: req.body.wishList }).populate('products.product')

    res.json({ cart: c, wishList: wL });

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong then move product to WishList", error: error })
  }
}