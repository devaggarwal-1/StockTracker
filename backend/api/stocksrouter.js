const { Router } = require("express")
const app = Router()
const jwt = require("jsonwebtoken");

app.get('/stocks', verifyToken, async (req, res) => {

    jwt.verify(req.token, 'key', (err, data) => {
        if (err) {
            res.status(403).send("Forbidden in stocks ")
        } else {
            res.json(data)
        }
    })

})

function verifyToken(req, res, next) {
    const bearerheader = req.headers['authorization']

    if (typeof bearerheader !== 'undefined') {
        const bearerToken = bearerheader.split(' ')[1]
        console.log(bearerToken)
        req.token = bearerToken
        next()
    } else {
        res.status(403).send("Forbidden in verify token")
    }
}

module.exports = app