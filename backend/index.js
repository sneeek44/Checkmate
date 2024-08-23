const express = require('express')
const database = require('./database')
const api = require("./routes/api")
const path = require("node:path");

const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use("/api", api)

app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    database.connect()
})
