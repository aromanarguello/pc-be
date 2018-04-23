const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/express-users')
    .then(() => {
        console.log('Mongoose is Connected!!!')
    })
    .catch(err => {
        console.log('Mongoose connection Failed!')
        console.log(err)
    })

    //mongodb://aroman:Test123!@ds041861.mlab.com:41861/dummy_data