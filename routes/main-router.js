const express         = require('express');
const UserModel       = require('../models/user-models');
const PriceModel      = require('../models/prices-models')
const Passport        = require('passport');
const app             = express();
const router          = express.Router();

// route with contains data payload for exams
router.route('/prices')
.get((req, res) => {
    PriceModel.find().exec().then( priceResults => {
        res.status(200).json(priceResults)
    })
})

module.exports = router;