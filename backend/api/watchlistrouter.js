const { Router } = require("express")
const app = Router()
const CustomerModel = require('../models/customer')


app.post('/addWatchlist', async (req, res) => {
    const username = req.body.username
    const stock = req.body.stock

    const user = await CustomerModel.findOne({ username: username })

    if (user) {
        const updated = await CustomerModel.findByIdAndUpdate(user.id, { "$push": { "watchList": stock } })
        res.status(200).json(updated)
    } else {
        res.status(400).send("Can't find User")
    }

})

app.post("/removeWatchlist", async (req, res) => {
    const username = req.body.username
    const stock = req.body.stock

    const user = await CustomerModel.findOne({ username: username })

    if (user) {
        const updated = await CustomerModel.findByIdAndUpdate(user.id, { "$pull": { "watchList": stock } })
        res.status(200).json(updated)
    } else {
        res.status(400).send("Can't find User")
    }
})

app.get('/watchlist/:username', async (req, res) => {
    const username = req.params.username
    const user = await CustomerModel.findOne({ username: username })

    if (user) {
        res.status(200).json(user.watchList)
    } else {
        res.status(400).send("Can't find User")
    }

})


module.exports = app