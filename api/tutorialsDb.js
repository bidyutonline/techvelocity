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

function getTutorials(callBack) {
    
    Tutorials.find({}).then( record => {
        //console.log(record)
        callBack(record)
    })
}

function getTutorialbyBreadcrumb(breadcrumb, callBack) {
    Tutorials.find({breadcrumb : breadcrumb}).then( record => {
        //console.log(record)
        callBack(record)
    })    
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

function getTopics(callBack) {
    
    Topics.find({}).then( record => {
        //console.log(record)
        callBack(record)
    })
}

module.exports.addTutorial = addTutorial
module.exports.getTutorials = getTutorials
module.exports.getTutorialbyBreadcrumb = getTutorialbyBreadcrumb
module.exports.addTopic = addTopic
module.exports.getTopics = getTopics