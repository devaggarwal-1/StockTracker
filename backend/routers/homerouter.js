const { Router } = require('express')
const app = Router()

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

module.exports = app