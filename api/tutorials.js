const express = require('express')
const router = express.Router()
const Joi = require('joi')

const tutorials = [
    {id:1, name:"Python", description: "Python is great", breadcrumb: 'python'},
    {id:2, name:"Database", description: "MSSQL is great", breadcrumb: 'database'},
    {id:3, name:"Statistics", description: "Stats is great", breadcrumb: 'statistics'},
]

const topics = [
    {id:1, name:"Python Basics", breadcrumb:'python-basics', tutorialId:1},
    {id:2, name:"NumPy Basics", breadcrumb: 'numpy-basics', tutorialId:1},
    {id:3, name:"Pandas Basics", breadcrumb: 'pandas-basics', tutorialId:1},
    {id:4, name:"MSSQL Basics", breadcrumb: 'mssql-basics', tutorialId:2},
    {id:5, name:"MySQL Basics", breadcrumb: 'mysql-basics', tutorialId:2},
]

const articles = [
    {id:1, title: "Python Data Types", body:'Python Data Types bosy', breadcrumb:'python-data-types', topicId:1},
    {id:1, title: "Python List", body:'Pytho list body', breadcrumb:'python-list', topicId:1},
    {id:1, title: "Python tuple", body:'Python tuple body', breadcrumb:'python-tuple', topicId:1},
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  - /api/tutorials - lists all tutorials e.g. python, statistics etc
router.get('', (req, res) => {
    res.send(JSON.stringify(tutorials))
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// - /api/tutorials/:tutorialBreadCrumb - lists all topics under tutorials e.g. Python Basic, NumPy Basic tec
router.get('/:tutorialBreadCrumb', (req, res) => {

    // find the tutorial Id
    const tutorialBreadcrumb = req.params.tutorialBreadcrumb
    const tutorial = tutorials.find( item => item.Breadcrumb == tutorialBreadcrumb)
    if(tutorial) {
        res.send(tutorial)
    }
    else {
        res.status(401).send(`Tutorial with id ${tutorialId} does not exist`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// - /api/tutorials/:tutorialId/topics - lists all topics under tutorial id
router.get('/:tutorialBreadcrumb/topics', (req, res) => {
    const tutorialBreadcrumb = req.params.tutorialBreadcrumb
    const tutorial = tutorials.find( item => item.breadcrumb == tutorialBreadcrumb)    
    if(tutorial) {
        topicsFiltered = topics.filter( item => item.tutorialId == tutorial.id)
        res.send(JSON.stringify(topicsFiltered))
    }
    else {
        res.status(401).send(`Tutorial with url ${tutorialBreadcrumb} does not exist`)
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// - /api/tutorials/:tutorialId/topics/:topicId - lists all articles under topics
router.get('/:tutorialBreadcrumb/topics/:topicBreadcrumb', (req, res) => {
    const topicBreadcrumb = req.params.topicBreadcrumb
    const topic = topics.find( item => item.breadcrumb == topicBreadcrumb)    
    if(topic) {
        res.send(JSON.stringify(topic))
    }
    else {
        res.status(401).send(`Topic with url ${topicBreadcrumb} does not exist`)
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// - /api/tutorials/:tutorialId/topics/:topicId/articles - lists all articles under topics
router.get('/:tutorialBreadcrumb/topics/:topicBreadcrumb/articles', (req, res) => {
    const topicBreadcrumb = req.params.topicBreadcrumb
    const topic = topics.find( item => item.breadcrumb == topicBreadcrumb)    
    if(topic) {
        articleFiltered = articles.filter( item => item.topicId == topic.id)
        res.send(JSON.stringify(articleFiltered))
    }
    else {
        res.status(401).send(`Topic with url ${topicBreadcrumb} does not exist`)
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// - /api/tutorials/:tutorialId/topics/:topicId/articles/articleBreadcrumb - lists all articles under topics
router.get('/:tutorialBreadcrumb/topics/:topicBreadcrumb/articles/:articleBreadcrumb', (req, res) => {
    const articleBreadcrumb = req.params.articleBreadcrumb
    const article = articles.find( item => item.breadcrumb == articleBreadcrumb)    
    if(article) {
        res.send(JSON.stringify(article))
    }
    else {
        res.status(401).send(`Article with url ${articleBreadcrumb} does not exist`)
    }
})

module.exports = router;