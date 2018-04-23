const passport = require('passport');
const UserModel = require('../models/user-models');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy ({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, cb) {
        // this one is typically a DB call. Assume that the returned user object is preformatted and ready for storing in JWT
        return UserModel.findOne({ username, password })
            .then( user => {
                if (!user) {
                    return cb(null, false, { message: 'El usuario/contraseña no coinciden con nuestra base de datos'
                })
            }
            return cb(null, user, { message: 'Acceso aprobado'})
        })
        .catch(err => cb(err));
    }
))

passport.use( new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
    },
    function(jwtPayload, cb) {
        // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload
        return UserModel.findByIdAndRemove(jwtPayload.id)
            .then( user => {
                return cb(null, user)
            })
            .catch(err => {
                return cb(err)
            });
    }
))

// passport.serializeUser((userFromDb, done) => {
//     done(null, userFromDb._id)
// });

// passport.deserializeUser((idFromSession, done) => {
//     UserModel
//         .findById(idFromSession)
//         .then(userFromDb => {
//             done(null, userFromDb)
//         })
//         .catch(err => {
//             done(err)
//         })
// })