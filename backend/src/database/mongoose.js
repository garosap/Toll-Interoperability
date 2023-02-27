const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
 }, err => {
    if(err) {
        console.error('connection error:', err)
        throw err;
    }
    console.log('Database connected:', process.env.MONGODB_URL)
 })


