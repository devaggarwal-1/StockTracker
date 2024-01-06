const { Router } = require("express")
const app = Router()

app.get('/test', (req, res) => {
    res.send('Test !');
});

module.exports = app