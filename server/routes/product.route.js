const ProductController = require('../controllers/product.controller');
const { adminMidleware } = require('../midlewares/AdminMiddleware');
const { authenticate } = require('../settings/jwt.config')

module.exports = app => {
  app.get('/api/products', authenticate, ProductController.all)
  app.post('/api/products/create', authenticate, ProductController.create);
  app.get('/api/products/search', authenticate, ProductController.search);
  app.get('/api/products/:id', authenticate, ProductController.find);
  app.put('/api/products/:id', authenticate, ProductController.update);
  app.delete('/api/products/:id', authenticate, ProductController.delete);
};