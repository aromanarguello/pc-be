const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Se requiere el nombre del producto/servicio.']
        }, 
        price: {
            type: Number,
            required: [true, 'Se requiere el precio del producto/servicio']
        }
    } // END
);

const PriceModel = mongoose.model( 'Prices', priceSchema );

module.exports = PriceModel;