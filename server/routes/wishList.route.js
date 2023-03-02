const WishListController = require('../controllers/wishList.controller');
const { authenticate } = require('../settings/jwt.config')

module.exports = app => {
  app.get('/api/wish-list', authenticate, WishListController.wishList)
  app.get('/api/wish-list/:id', authenticate, WishListController.find);
  app.put('/api/wish-list/:id', authenticate, WishListController.update);
  app.delete('/api/wish-list/:id', authenticate, WishListController.delete);
  app.put('/api/wish-list/:id/move-to-cart', authenticate, WishListController.moveToCart);
};