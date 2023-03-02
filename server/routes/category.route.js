const CategoryController = require('../controllers/category.controller');
const { adminMidleware } = require('../midlewares/AdminMiddleware');
const { authenticate } = require('../settings/jwt.config')

module.exports = app => {
  app.get('/api/categories', authenticate, CategoryController.all)
  app.post('/api/categories/create', authenticate, CategoryController.create);
  app.get('/api/categories/:id', authenticate, CategoryController.find);
  app.put('/api/categories/:id', authenticate, CategoryController.update);
  app.delete('/api/categories/:id', authenticate, CategoryController.delete);
};