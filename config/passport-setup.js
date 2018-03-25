import passport from 'passport'
import UserModel from '../models/user-models'

passport.serializeUser( (userFromDb, done ) => {
    done(null, userFromDb._id)
});

passport.deserializeUser( (idFromSession, done ) => {
    UserModel
    .findById(idFromSession)
    .then( userFromDb => {
        done(null, userFromDb)
    })
    .catch( err => {
        done( err)
    })
})