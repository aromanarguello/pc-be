const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Mongoose is Connected!!!')
    })
    .catch(err => {
        console.log('Mongoose connection Failed!')
        console.log(err)
    })