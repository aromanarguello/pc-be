const User = require('../models/user-models');
const jwt = require('jwt-simple');

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET)
}

exports.signin = function(req, res, next) {
    res.send({
        token: tokenForUser(req.user)
    })
}

exports.signup = function(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    if (!email || !password) {
        return res.status(422).send({ 
            error: 'Debe ingresar su correo y contraseña'
        });
    }

    if(!firstName || !lastName) {
        return res.status(422).send({
            error: 'Debe ingresar su Primer Nombre y Apellido'
        })
    }

    if (password === undefined ||
        password.length < 6 ||
        password.match(/[^a-z0-9]/i) === null ) {
        return res.status(422).send({
            error: 'Su contraseña debe tener un minimo de 6 caracteres'
        });
    }

    if (password !== confirmPassword ) {
        return res.status(422).send({
            error: 'Sus contraseñas deben coincidir'
        })
    }

    User.findOne({ email }, function(err, existingUser) {
        if (err) { return next(err) };

        if (existingUser) {
            return res.status(422).send({ 
                error: 'El correo que ha ingresado existe en nuesta base de datos. Debe ingresar un correo electronico unico' });
        }

        const user = new User({
            email,
            password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        user.save( err => {
            if (err) { return next(err); }
        });
    
        res.status(200).json({ 
            token: tokenForUser(user),
            isLoggedIn: true
        });
    
    })
}