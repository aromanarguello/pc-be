const passport = require('passport');
const UserModel = require('../models/user-models');

passport.serializeUser((userFromDb, done) => {
    done(null, userFromDb._id)
});

passport.deserializeUser((idFromSession, done) => {
    UserModel
        .findById(idFromSession)
        .then(userFromDb => {
            done(null, userFromDb)
        })
        .catch(err => {
            done(err)
        })
})