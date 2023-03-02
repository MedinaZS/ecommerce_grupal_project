const CartController = require('../controllers/cart.controller');
const { authenticate } = require('../settings/jwt.config')

module.exports = app => {
  app.get('/api/cart', authenticate, CartController.cart)
  app.get('/api/cart/:id', authenticate, CartController.find);
  app.put('/api/cart/:id', authenticate, CartController.update);
  app.delete('/api/cart/:id', authenticate, CartController.delete);
  app.put('/api/cart/:id/move-to-wish-list', authenticate, CartController.moveToWishList);
};