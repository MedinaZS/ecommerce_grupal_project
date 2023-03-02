const UserController = require('../controllers/user.controller');
const { authenticate } = require('../settings/jwt.config')

module.exports = function (app) {
    app.get('/api/users', authenticate, UserController.all)
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.logIn);
    app.get('/api/logout', UserController.logOut);
    app.get('/api/user', UserController.checkUser);
}