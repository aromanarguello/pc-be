const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

/** POST login */
router.post('/', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if ( err || !user ) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }

        req.login(user, { session: false }, ( err ) => {
            if(err) {
                res.send(err);
            }

            // generate a singed JWT with the contnents of user object and return it in the response
            
            const token = jwt.sign(user, '')
        })
    })
})