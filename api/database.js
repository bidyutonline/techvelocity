const { string } = require("joi")
const mongoose = require("mongoose")
const NODE_APP_DB_URL = 'mongodb://127.0.0.1:27017/db_techvelocity'


mongoose.connect(NODE_APP_DB_URL)

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
        console.log(record)
        callBack(record)
    })
}


module.exports.addTutorial = addTutorial
module.exports.getTutorials = getTutorials