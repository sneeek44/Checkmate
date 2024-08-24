const express = require('express')
const database = require('./database')
const api = require("./routes/api")
const path = require("node:path");

const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use("/api", api)
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', function(_req, res) {
    res.render('pages/home')
})
app.get('/ru', function (_req, res) {
    res.render('pages/ru/home')
})
app.get('/login', function (req, res) {
    res.render('pages/login')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    database.connect()
})
