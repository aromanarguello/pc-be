const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect("mongodb://aroman:Test123!@ds041861.mlab.com:41861/dummy_data")
    .then(() => {
        console.log('Mongoose is Connected!!!')
    })
    .catch(err => {
        console.log('Mongoose connection Failed!')
        console.log(err)
    })