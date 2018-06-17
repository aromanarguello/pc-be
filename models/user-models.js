const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Su Primer Nombre es requerido.']
        },
        
        lastName: {
            type: String,
            required: [true, 'Su Apellido es requerido']
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, 'Su Correo Electronico es requerido']
        },
        password: {
            type: String,
            required: [true, 'Su Contraseña es requerida.']
        }
    }, // END USER SCHEMA

    {
        timestamps: true
    } // END TIME STAMPS
);

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err) }

            user.password = hash;
            next();
        });

    })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return cb(err); }

        cb(null, isMatch)
    })
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;