const mongoose = require('mongoose')

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
            required: [true, 'Su Correo Electronico es requerido']
        },
        encryptedPassword: {
            type: String,
            required: [true, 'Su Contraseña es requerida.']
        },
        encryptedPasswordConf: {
            type: String,
            required: [true, 'Su Contraseña es requerida.']            
        }
    }, // END USER SCHEMA

    {
        timestamps: true
    } // END TIME STAMPS
);

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;