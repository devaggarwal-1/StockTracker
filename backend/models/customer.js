const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    watchList: [{
        type: String
    }]
})

const CustomerModel = mongoose.model("customers", CustomerSchema, "customers")
module.exports = CustomerModel  