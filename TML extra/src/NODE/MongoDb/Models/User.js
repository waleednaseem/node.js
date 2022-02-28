const mongoose = require('mongoose')


const userModel = new mongoose.Schema({
    Username: {
        type: String,
        require: true,
        min: 4,
        max: 20,
        // unique:true
    },
    password: {
        type: String,
        require: true,
        min: 4,
        max: 50,
        // unique:false
    },
    Data: []

}, {
    timestamps: true
})

module.exports = mongoose.model('users', userModel)