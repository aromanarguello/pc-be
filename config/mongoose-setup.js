import mongoose from 'mongoose'

mongoose.Promise = Promise;

mongoose.connect ( process.env.MONGODB_URI, { useMongoClient: true } )
    .then ( () => {
        console.log( 'Mongoose is Connected!!!')
})
    .catch( err => {
        console.log( 'Mongoose connection Failed!')
        console.log(err)
    })