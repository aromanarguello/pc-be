const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderObj = new Schema({
    name: String,
    price: Number,
 }, { _id : false })

const orderSchema = new Schema (
    {
        physicianName: String,
        patientName: String,
        order: {type: [orderObj]}
    }
)

const OrderModel = mongoose.model('Orders', orderSchema);

module.exports = OrderModel;