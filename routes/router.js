const Order = require('../controllers/exams');
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');


const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
    app.get('/precios', Order.prices);
    app.get('/ordenes', requireAuth, Order.fetchOrder);
    app.get('/usuario', requireAuth, Authentication.providerInfo )
    app.post('/ordenes', Order.createOrder)
    app.post('/ingresar', requireSignin, Authentication.signin);
    app.post('/registrar', Authentication.signup)
}