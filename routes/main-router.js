const express         = require('express');
const UserModel       = require('../models/user-models');
const PriceModel      = require('../models/prices-models');
const OrderModel      = require('../models/order-model');
const router          = express.Router();

// route with contains data payload for exams
router.route('/prices')
.get((req, res) => {
    PriceModel.find().exec().then( priceResults => {
        res.status(200).json(priceResults)
    })
})

router.route('/ordenes')
.post((req, res, err) => {
    const newOrder = new OrderModel(
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
        })
    }
);

router.route('/ordenes')
.get( (req, res, err) => {
    OrderModel.find().exec().then( orderResults => {
        res.status(200).json(orderResults)
    })
})

module.exports = router;