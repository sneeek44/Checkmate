const express = require('express')
const database = require('./database')
const api = require("./routes/api")

const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use("/api", api)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    database.connect()
})

