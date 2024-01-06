const express = require('express')
const mongoose = require('mongoose')
const CustomerModel = require('./models/customer')
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}


const home = require('./routers/homerouter')
const register = require("./routers/registerrouter")
const login = require("./routers/loginrouter")
const stocks = require("./routers/stocksrouter")
const watchlist = require("./routers/watchlistrouter")
const test = require("./routers/testrouter")

//middlewares
const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(home)
app.use(register)
app.use(login)
app.use(stocks)
app.use(watchlist)
app.use(test)

//connecting to the mongo db Database
mongoose.connect('mongodb+srv://root:root@cluster0.kdpnm4i.mongodb.net/customer?retryWrites=true&w=majority')
    .then(() => console.log("Database Connected"))
    .catch(() => console.log("error"))



app.listen(5000, () => {
    console.log("Server running on Port: 5000")
})