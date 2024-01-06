const { Router } = require("express")
const app = Router()
const CustomerModel = require('../models/customer')
const jwt = require("jsonwebtoken");


app.post('/login', async (req, res) => {
    const { username, password } = req.body
    var pwdCheck = false
    //check if username already exists
    const user = await CustomerModel.findOne({ username: username })
    if (user) {
        pwdCheck = password === user.password
    }

    if (!username || !password) {
        res.status(400).send("Missing Username or password")
    } else if (!user || !pwdCheck) {
        res.status(404).send("Incorrect Username or Password")
    } else if (user) {
        let token = jwt.sign({ username: username }, 'key', { expiresIn: "1h" })

        res.status(200).json({
            token,
            username
        });

    }
})

module.exports = app