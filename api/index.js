const express = require('express')
var cors = require('cors')
const app = express()

const tutorialsRoutes = require('./tutorials')

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())

app.use('/api/tutorials', tutorialsRoutes)

app.get('/', (req, res) => {
    res.send("Hello World!")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => `Listening at port ${PORT}`)