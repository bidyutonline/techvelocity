const express = require('express')
const router = express.Router()
const Joi = require('joi')
const database = require('./tutorialsDb')

// const tutorials = [
//     {id:1, name:"Python", description: "Python is great", breadcrumb: 'python'},
//     {id:2, name:"Database", description: "MSSQL is great", breadcrumb: 'database'},
//     {id:3, name:"Statistics", description: "Stats is great", breadcrumb: 'statistics'},
// ]

// const topics = [
//     {id:1, name:"Python Basics", breadcrumb:'python-basics', tutorialId:1},
//     {id:2, name:"NumPy Basics", breadcrumb: 'numpy-basics', tutorialId:1},
//     {id:3, name:"Pandas Basics", breadcrumb: 'pandas-basics', tutorialId:1},
//     {id:4, name:"MSSQL Basics", breadcrumb: 'mssql-basics', tutorialId:2},
//     {id:5, name:"MySQL Basics", breadcrumb: 'mysql-basics', tutorialId:2},
// ]

// const articles = [
//     { id: 1, title: "Python Data Types", body: 'Python Data Types bosy', breadcrumb: 'python-data-types', topicId: 1 },
//     { id: 1, title: "Python List", body: 'Pytho list body', breadcrumb: 'python-list', topicId: 1 },
//     { id: 1, title: "Python tuple", body: 'Python tuple body', breadcrumb: 'python-tuple', topicId: 1 },
// ]

/*
 - Tutorial (e.g. Python) => Menu
    --> Topic (e.g. NumPy Basic) => Submenu
        --> Article (e.g. NumPy Array) => Content
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint: /api/tutorials
// Returns: list of all tutorials
////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('', async (req, res) => {
    const tutorials = await database.getTutorials()
    res.send(tutorials)
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint: /api/tutorials/:tutorialBreadCrumb
// Returns: tutorial object having breadcrumb =  tutorialBreadCrumb
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:tutorialBreadCrumb', async (req, res) => {

    console.log("Call in /:tutorialBreadCrumb")
    // find the tutorial Id
    const tutorialBreadcrumb = req.params.tutorialBreadcrumb
    const tutorial = await database.getTutorialbyBreadcrumb(tutorialBreadcrumb)
    if (tutorial) {
        res.send(tutorial)
    }
    else {
        res.status(401).send(`Tutorial with id ${tutorialId} does not exist`)
    }

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint: /api/tutorials/:tutorialId/topics
// Returns: All topics under tutorial with breadcrumb = tutorialId
////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:tutorialBreadcrumb/topics', async (req, res) => {

    console.log("Call in /:tutorialBreadcrumb/topics")

    const tutorialBreadcrumb = req.params.tutorialBreadcrumb
    const topics = await database.getTopics()
    if (topics) {
        topicsFiltered = topics.filter(item => item.tutorial == tutorialBreadcrumb)
        res.send(JSON.stringify(topicsFiltered))
    }
    else {
        res.status(401).send(`Tutorial with url ${tutorialBreadcrumb} does not exist`)
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint: /api/tutorials/:tutorialId/topics/:topicBreadcrumb
// Returns: topic object with breadcrumb = topicBreadcrumb
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:tutorialBreadcrumb/topics/:topicBreadcrumb', async (req, res) => {
    const topicBreadcrumb = req.params.topicBreadcrumb
    const topic = await database.getTopicByBreadcrumb(topicBreadcrumb)
    if (topic) {
        res.send(JSON.stringify(topic))
    }
    else {
        res.status(401).send(`Topic with url ${topicBreadcrumb} does not exist`)
    }    
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint: /api/tutorials/:tutorialId/topics/:topicBreadcrumb/articles
// Returns:  All articles under topics with breadcrumb = topicBreadcrumb
////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:tutorialBreadcrumb/topics/:topicBreadcrumb/articles', async (req, res) => {
    const topicBreadcrumb = req.params.topicBreadcrumb
    //console.log(topicBreadcrumb)
    const articleFiltered = await database.getArticlesByTopic(topicBreadcrumb)
    //console.log(articleFiltered)
    res.send(JSON.stringify(articleFiltered))
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Endpoint: /api/tutorials/:tutorialBreadcrumb/topics/:topicBreadcrumb/articles/:articleBreadcrumb
// Returns:  article object having breadcrumb = articleBreadcrumb
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:tutorialBreadcrumb/topics/:topicBreadcrumb/articles/:articleBreadcrumb', async (req, res) => {
    const articleBreadcrumb = req.params.articleBreadcrumb
    console.log(articleBreadcrumb)
    const article = await database.getArticleByBreadcrumb(articleBreadcrumb)
    if (article) {
        res.send(JSON.stringify(article))
    }
    else {
        res.status(401).send(`Article with url ${articleBreadcrumb} does not exist`)
    }
})


router.post('/add', (req, res) => {
    //console.log(req.body.params)
    database.addTutorial(req.body.params, (document) => {
        //console.log(document)
        res.send(document)
    })
})


router.post('/topics/add', (req, res) => {
    //console.log(req.body.params)
    database.addTopic(req.body.params, (document) => {
        //console.log(document)
        res.send(document)
    })
})


router.post('/topics/articles/add', (req, res) => {
    console.log(req.body.params)
    database.addArticle(req.body.params, (document) => {
        //console.log(document)
        res.send(document)
    })
})

/* Add routes before this line */

///////////////////////////////////////////////// End of Routes ////////////////////////////////////////////
module.exports = router;