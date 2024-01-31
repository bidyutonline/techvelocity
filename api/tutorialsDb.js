const { string } = require("joi")
const mongoose = require("mongoose")
const NODE_APP_DB_URL = 'mongodb://127.0.0.1:27017/db_techvelocity'


mongoose.connect(NODE_APP_DB_URL)

//====================== Tutorials ======================================

const TutorialSchema = mongoose.Schema({
    name: String,
    breadcrumb: {type: String, unique: true},
    description: String
})

const Tutorials = mongoose.model('Tutorials', TutorialSchema)
    

function addTutorial(tutorialArgs, callback) {

    const tutorial = new Tutorials(tutorialArgs)
    tutorial.save()
        .then( res => callback(res) )
        .catch(error => callback({error: "error occurred" }))
}

async function getTutorials() {
    records = await Tutorials.find({})
    return records
}

async function getTutorialbyBreadcrumb(breadcrumb) {
    const record = await Tutorials.find({breadcrumb : breadcrumb})
    return record
}

// ============================ Topic ============================
const TopicSchema = mongoose.Schema({
    name: String,
    breadcrumb: {type: String, unique: true},
    description: String,
    tutorial: String
})

const Topics = mongoose.model('Topics', TopicSchema)
    

function addTopic(topicArgs, callback) {

    const topic = new Topics(topicArgs)
    topic.save()
        .then( res => callback(res) )
        .catch(error => callback({error: "error occurred" }))
}


async function getTopics() {
    const topics = await Topics.find({})
    return topics
}

async function getTopicByBreadcrumb(breadcrumb) {
    const topics = await Topics.find({breadcrumb: breadcrumb})
    return topics
}

//======================= Article =======================================

const ArticleSchema = mongoose.Schema({
    title: String,
    content: String,
    breadcrumb: {type: String, unique: true},
    keywords: String,
    isPublished: {type: Boolean, default: true},
    author: {type: String, default: "Techvelocity"},
    dateCreated: {type: Date, default: Date.now},
    tutorial: String,
    topic: String,
})

const Articles = mongoose.model('Articles', ArticleSchema)

async function addArticle(articleArgs, callback) {
    const article = new Articles(articleArgs)
    article.save()
        .then( res => callback(res) )
        .catch(error => callback({error: "error occurred" }))
}


module.exports.addTutorial = addTutorial
module.exports.getTutorials = getTutorials
module.exports.getTutorialbyBreadcrumb = getTutorialbyBreadcrumb

module.exports.addTopic = addTopic
module.exports.getTopics = getTopics
module.exports.getTopicByBreadcrumb = getTopicByBreadcrumb

module.exports.addArticle = addArticle