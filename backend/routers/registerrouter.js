const { Router } = require("express")
const app = Router()
const CustomerModel = require('../models/customer')


app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    //check if username already exists
    const user = await CustomerModel.findOne({ username: username })

    //if not registers the user
    if (!user) {
        const customer = await CustomerModel({
            username: username,
            password: password,

        })
        await customer.save()
        res.status(201).json(customer)
    } else {
        res.status(409).send("Already there")
    }

})

module.exports = app