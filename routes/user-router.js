const express         = require('express');
const bcrypt          = require('bcrypt');
const UserModel       = require('../models/user-models');
const Passport        = require('passport');
const router          = express.Router();

/** 
 * POST /signup
 */
router.post('/registrar', (req, res, next) => {
    if (req.body.password === undefined ||
        req.body.password.length < 6 ||
        req.body.password.match(/[^a-z0-9]/i) === null) {
        res.status(400).json({
            error: 'Contraseña no cumple con los requerimientos'
        });
        return;
    }
    UserModel.findOne({
            email: req.body.email
        })
        .then(userFromDb => {
            if (userFromDb !== null) {
                res.status(400).json({
                    error: 'Este correo ha sido usado previamente'
                });
                return;
            }
            const salt = bcrypt.genSaltSync(10);
            const scrambledPassword = bcrypt.hashSync(req.body.password, salt);
            const theUser = new UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                encryptedPassword: scrambledPassword
            });
            return theUser.Save();
        })
        .then(userFromDb => {
            req.login(userFromDb, (err) => {
                userFromDb.encryptedPassword = undefined;
                res.status(200).json({
                    isLoggedIn: true,
                    userInfo: userFromDb
                });
            });
        })
        .catch(err => {
            console.log('POST /signup ERROR!');
            console.log(err);
            if (err.errors) {
                res.status(400).json(err.errors);
            } else {
                res.status(500).json({
                    error: 'Sign up database error'
                })
            }
        });
});
/**
 *  POST /login
 */
router.post('/login', (req, res, next) => {
    UserModel.findOne({
            email: req.body.email
        })
        .then(userFromDb => {
            console.log(req.body.email);
            console.log(userFromDb);
            if (userFromDb === null) {
                res.status(400).json({
                    error: 'El Correo Electronico es invalido'
                })
                return;
            }
            const isPassWordgood = bcrypt.compareSync(req.body.password, userFromDb.encryptedPassword);
            if (isPassWordgood === false) {
                res.status(400).json({
                    error: 'La Contraseña es invalida'
                })
            }
            req.login(userFromDb, (err) => {
                userFromDb.encryptedPassword = undefined;
                res.status(200).json({
                    isLoggedIn: true,
                    userInfo: userFromDb
                });
            });
        })
        .catch(err => {
            console.log('Post /login ERROR!')
            console.log(err)
            res.status(500).json({
                err: 'Log in database error'
            });
        });
});
/**
 * DELETE /logout
 */
router.delete('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({
        isLoggedIn: false,
        userInfo: null
    });
});
/**
 * GET /checklogin
 */
router.get('/checklogin', (req, res, next) => {
    if (req.user) {
        req.user.encryptedPassword = undefined;
        req.status(200).json({
            isLoggedIn: true,
            userInfo: req.user
        });
    } else {
        res.status(200).json({
            isLoggedIn: false,
            userInfo: null
        });
    }
});