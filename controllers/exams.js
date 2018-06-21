const Order = require('../models/order-model');
const Prices = require('../models/prices-models');

exports.prices = function(req, res, next) {
    Prices
    .find()
    .exec()
    .then( priceResults => {
        res.status(200).json(priceResults)
    })
}

exports.createOrder = function(req, res) {
    const newOrder = new Order(
        {
            physicianName: req.body.physicianName,
            patientName: req.body.patientName,
            order: req.body.order
        }
    );

    newOrder.save()
    .then(() => {
            console.log(newOrder)
            res.status(200).json(newOrder)
        })
        .catch(err => {
            if (err.errors) {
                res.status(400).json(err.errors);
            } else {
                res.status(500).json({
                    err: 'Create Order Database Error'
                });
            }
        }
    )
}

exports.fetchOrder = function(req, res) {
    Order
    .find()
    .exec()
    .then( orderResults => {
        res.status(200).json(orderResults)
    })
}