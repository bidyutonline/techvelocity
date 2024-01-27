const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World!")
})

/*
 - Tutorial (e.g. Python) --> Topic (e.g. NumPy Basic) --> Article (e.g. NumPy Array)
 - /api/tutorials - lists all tutorials e.g. python, statistics etc
 - /api/tutorials/:tutorialId - lists all topics under tutorials e.g. Python Basic, NumPy Basic tec
 - /api/tutorials/:tutorialId/:topicId - lists all articles under topic like NumPy Array
 - /api/tutorials/:tutorialId/:topicId/:articleId - returns article
*/

app.get('/api/tutorials', (req, res) => {

    const tutorials = [
        {id:1, name:"Python", description: "Python is great"},
        {id:2, name:"Database", description: "MSSQL is great"},
        {id:3, name:"Statistics", description: "Stats is great"},
    ]

    res.send(JSON.stringify(tutorials))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => `Listening at port ${PORT}`)