const express = require('express')
const app = express()

const tutorialsRoutes = require('./tutorials')

app.use(express.json())

app.use('/api/tutorials', tutorialsRoutes)

app.get('/', (req, res) => {
    res.send("Hello World!")
})

/*
 - Tutorial (e.g. Python) => Menu
    --> Topic (e.g. NumPy Basic) => Submenu
        --> Article (e.g. NumPy Array) => Content
*/



const PORT = process.env.PORT || 3001
app.listen(PORT, () => `Listening at port ${PORT}`)